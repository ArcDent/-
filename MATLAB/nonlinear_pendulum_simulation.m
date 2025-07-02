function nonlinear_pendulum_simulation()
    % 创建UI窗口
    fig = uifigure('Name', 'Nonlinear Pendulum Simulation', 'Position', [100 100 1000 700]);
    
    % 创建面板用于参数输入
    panel = uipanel(fig, 'Title', 'Parameters', 'Position', [20 350 300 300]);
    
    % 添加参数输入控件
    R_edit = uieditfield(panel, 'numeric', 'Value', 1, 'Position', [20 250 100 22], 'Limits', [0.1 10], 'Tooltip', 'R value');
    uilabel(panel, 'Text', 'R', 'Position', [130 250 50 22]);
    
    L_edit = uieditfield(panel, 'numeric', 'Value', 1, 'Position', [20 220 100 22], 'Limits', [0.1 10], 'Tooltip', 'L value');
    uilabel(panel, 'Text', 'L', 'Position', [130 220 50 22]);
    
    g_edit = uieditfield(panel, 'numeric', 'Value', 9.81, 'Position', [20 190 100 22], 'Limits', [1 20], 'Tooltip', 'Gravity');
    uilabel(panel, 'Text', 'g', 'Position', [130 190 50 22]);
    
    a0_edit = uieditfield(panel, 'numeric', 'Value', 1, 'Position', [20 160 100 22], 'Limits', [0 10], 'Tooltip', 'a_0');
    uilabel(panel, 'Text', 'a_0', 'Position', [130 160 50 22]);
    
    omega_edit = uieditfield(panel, 'numeric', 'Value', 1, 'Position', [20 130 100 22], 'Limits', [0 10], 'Tooltip', 'ω');
    uilabel(panel, 'Text', 'ω', 'Position', [130 130 50 22]);
    
    theta0_edit = uieditfield(panel, 'numeric', 'Value', 0.5, 'Position', [20 100 100 22], 'Limits', [0 pi/2], 'Tooltip', 'Initial θ (rad)');
    uilabel(panel, 'Text', 'Initial θ', 'Position', [130 100 50 22]);
    
    % 添加模拟按钮
    sim_button = uibutton(fig, 'push', 'Text', 'Simulate', 'Position', [20 300 100 30], 'ButtonPushedFcn', @run_simulation);
    
    % 创建绘图区域
    ax1 = uiaxes(fig, 'Position', [350 400 600 250]);
    title(ax1, 'θ vs Time');
    xlabel(ax1, 'Time (s)');
    ylabel(ax1, 'θ (rad)');
    grid(ax1, 'on');
    
    ax2 = uiaxes(fig, 'Position', [350 100 600 250]);
    title(ax2, 'Phase Portrait (θ vs dθ/dt)');
    xlabel(ax2, 'θ (rad)');
    ylabel(ax2, 'dθ/dt (rad/s)');
    grid(ax2, 'on');
    
    % 模拟函数
    function run_simulation(~, ~)
        % 获取参数值
        R = R_edit.Value;
        L = L_edit.Value;
        g = g_edit.Value;
        a0 = a0_edit.Value;
        omega = omega_edit.Value;
        theta_init = theta0_edit.Value;
        
        % 计算临界角度θ_0
        theta_0 = asin(R/(R+L));
        
        % 检查初始条件
        if theta_init <= theta_0 || theta_init >= pi/2
            errordlg('Initial θ must be between θ_0 and π/2', 'Invalid Initial Condition');
            return;
        end
        
        % 计算系数
        denominator = 5*R^2 + 3*L^2;
        A = 3*a0*omega^2 / denominator;
        B = 3*g / denominator;
        
        % 定义微分方程
        odefun = @(t, y) [y(2); 
                         -(A*cos(omega*t) + B)*sin(y(1))];
        
        % 初始条件 [θ, dθ/dt]
        y0 = [theta_init; 0];
        
        % 模拟时间
        tspan = [0 20];
        
        % 事件函数 - 当θ达到θ_0或π/2时停止
        options = odeset('Events', @(t,y) event_function(t, y, theta_0));
        
        % 解微分方程
        [t, y, te, ye, ie] = ode45(odefun, tspan, y0, options);
        
        % 提取结果
        theta = y(:,1);
        dtheta = y(:,2);
        
        % 筛选在θ_0到π/2之间的数据
        valid_idx = theta >= theta_0 & theta <= pi/2;
        t = t(valid_idx);
        theta = theta(valid_idx);
        dtheta = dtheta(valid_idx);
        
        % 绘制θ-t图
        cla(ax1);
        plot(ax1, t, theta, 'b', 'LineWidth', 1.5);
        hold(ax1, 'on');
        plot(ax1, [t(1) t(end)], [theta_0 theta_0], 'r--', 'LineWidth', 1);
        plot(ax1, [t(1) t(end)], [pi/2 pi/2], 'g--', 'LineWidth', 1);
        hold(ax1, 'off');
        legend(ax1, {'θ(t)', 'θ_0', 'π/2'}, 'Location', 'best');
        
        % 绘制相图
        cla(ax2);
        plot(ax2, theta, dtheta, 'b', 'LineWidth', 1.5);
        hold(ax2, 'on');
        plot(ax2, [theta_0 theta_0], [min(dtheta) max(dtheta)], 'r--', 'LineWidth', 1);
        plot(ax2, [pi/2 pi/2], [min(dtheta) max(dtheta)], 'g--', 'LineWidth', 1);
        hold(ax2, 'off');
        legend(ax2, {'Phase Portrait', 'θ_0', 'π/2'}, 'Location', 'best');
    end

    % 事件函数 - 当θ达到θ_0或π/2时停止
    function [value, isterminal, direction] = event_function(t, y, theta_0)
        value = [y(1) - theta_0;  % θ - θ_0
                 y(1) - pi/2];    % θ - π/2
        isterminal = [1; 1];      % 在两种情况下都停止积分
        direction = [-1; 1];      % θ下降通过θ_0或上升通过π/2
    end
end
