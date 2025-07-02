function PendulumCollisionSimulator
    % 创建主窗口
    fig = figure('Name', 'Pendulum Collision Simulator', 'NumberTitle', 'off', ...
                 'Position', [100, 100, 1200, 600], 'Color', [0.95, 0.95, 0.95]);
    
    % 创建坐标轴
    ax1 = subplot(1,2,1);
    title(ax1, '\theta vs Time');
    xlabel(ax1, 'Time (s)');
    ylabel(ax1, '\theta (rad)');
    grid(ax1, 'on');
    hold(ax1, 'on');
    
    ax2 = subplot(1,2,2);
    title(ax2, 'Phase Diagram');
    xlabel(ax2, '\theta (rad)');
    ylabel(ax2, 'd\theta/dt (rad/s)');
    grid(ax2, 'on');
    hold(ax2, 'on');
    
    % 创建控制面板
    panel = uipanel(fig, 'Title', 'Parameters', 'Position', [0.7, 0.1, 0.25, 0.8]);
    
    % 添加参数输入控件
    uicontrol(panel, 'Style', 'text', 'String', 'R:', ...
              'Position', [20, 450, 100, 20], 'HorizontalAlignment', 'left');
    R_edit = uicontrol(panel, 'Style', 'edit', 'String', '0.1', ...
                       'Position', [120, 450, 80, 20]);
    
    uicontrol(panel, 'Style', 'text', 'String', 'L:', ...
              'Position', [20, 420, 100, 20], 'HorizontalAlignment', 'left');
    L_edit = uicontrol(panel, 'Style', 'edit', 'String', '0.5', ...
                       'Position', [120, 420, 80, 20]);
    
    uicontrol(panel, 'Style', 'text', 'String', 'g:', ...
              'Position', [20, 390, 100, 20], 'HorizontalAlignment', 'left');
    g_edit = uicontrol(panel, 'Style', 'edit', 'String', '9.8', ...
                       'Position', [120, 390, 80, 20]);
    
    uicontrol(panel, 'Style', 'text', 'String', 'a_0:', ...
              'Position', [20, 360, 100, 20], 'HorizontalAlignment', 'left');
    a0_edit = uicontrol(panel, 'Style', 'edit', 'String', '0.1', ...
                        'Position', [120, 360, 80, 20]);
    
    uicontrol(panel, 'Style', 'text', 'String', '\omega:', ...
              'Position', [20, 330, 100, 20], 'HorizontalAlignment', 'left');
    omega_edit = uicontrol(panel, 'Style', 'edit', 'String', '10', ...
                           'Position', [120, 330, 80, 20]);
    
    uicontrol(panel, 'Style', 'text', 'String', 'Initial \theta:', ...
              'Position', [20, 300, 100, 20], 'HorizontalAlignment', 'left');
    theta_init_edit = uicontrol(panel, 'Style', 'edit', 'String', '1.0', ...
                               'Position', [120, 300, 80, 20]);
    
    uicontrol(panel, 'Style', 'text', 'String', 'Simulation Time (s):', ...
              'Position', [20, 270, 100, 20], 'HorizontalAlignment', 'left');
    t_final_edit = uicontrol(panel, 'Style', 'edit', 'String', '10', ...
                             'Position', [120, 270, 80, 20]);
    
    % 添加按钮
    simulate_btn = uicontrol(panel, 'Style', 'pushbutton', 'String', 'Simulate', ...
                            'Position', [50, 200, 100, 30], ...
                            'Callback', @simulateCallback);
    
    % 存储坐标轴和控制元素
    data.ax1 = ax1;
    data.ax2 = ax2;
    data.R_edit = R_edit;
    data.L_edit = L_edit;
    data.g_edit = g_edit;
    data.a0_edit = a0_edit;
    data.omega_edit = omega_edit;
    data.theta_init_edit = theta_init_edit;
    data.t_final_edit = t_final_edit;
    
    guidata(fig, data);

    % 模拟回调函数
    function simulateCallback(~, ~)
        data = guidata(gcbf);
        
        % 获取参数值
        R = str2double(get(data.R_edit, 'String'));
        L = str2double(get(data.L_edit, 'String'));
        g = str2double(get(data.g_edit, 'String'));
        a0 = str2double(get(data.a0_edit, 'String'));
        omega = str2double(get(data.omega_edit, 'String'));
        theta_init = str2double(get(data.theta_init_edit, 'String'));
        t_final = str2double(get(data.t_final_edit, 'String'));
        
        % 计算θ₀ (临界角度)
        theta0 = asin(R / (R + L));
        
        % 验证初始角度
        if theta_init <= theta0 || theta_init >= pi/2
            errordlg('Initial θ must be between θ₀ and π/2!', 'Input Error');
            return;
        end
        
        % 清除旧图形
        cla(data.ax1);
        cla(data.ax2);
        
        % 添加参考线
        plot(data.ax1, [0, t_final], [theta0, theta0], 'r--', 'LineWidth', 1.5, 'DisplayName', '\theta_0');
        plot(data.ax1, [0, t_final], [pi/2, pi/2], 'g--', 'LineWidth', 1.5, 'DisplayName', '\pi/2');
        plot(data.ax2, [theta0, theta0], [-100, 100], 'r--', 'LineWidth', 1.5, 'DisplayName', '\theta_0');
        plot(data.ax2, [pi/2, pi/2], [-100, 100], 'g--', 'LineWidth', 1.5, 'DisplayName', '\pi/2');
        
        % 设置坐标轴范围
        ylim(data.ax1, [theta0 - 0.1, pi/2 + 0.1]);
        xlim(data.ax2, [theta0 - 0.1, pi/2 + 0.1]);
        
        % 设置图例
        legend(data.ax1, 'Location', 'best');
        legend(data.ax2, 'Location', 'best');
        
        % 微分方程参数
        params.R = R;
        params.L = L;
        params.g = g;
        params.a0 = a0;
        params.omega = omega;
        params.theta0 = theta0;
        
        % 初始条件 [θ; dθ/dt]
        y0 = [theta_init; 0];
        t_span = [0, t_final];
        
        % 初始化存储数组
        all_t = [];
        all_y = [];
        
        % 模拟循环（处理多次碰撞）
        t_start = 0;
        options = odeset('Events', @(t,y) events(t, y, params), 'RelTol', 1e-6);
        while t_start < t_final
            % 求解ODE直到事件或结束时间
            [t_ode, y_ode, te, ye, ie] = ode45(@(t,y) odefunc(t, y, params), ...
                                             [t_start, t_final], y0, options);
            
            % 存储结果
            all_t = [all_t; t_ode];
            all_y = [all_y; y_ode];
            
            % 如果没有事件发生，退出循环
            if isempty(te)
                break;
            end
            
            % 处理碰撞：更新速度
            v_before = y_ode(end, 2);
            v_after = -v_before * cos(2 * params.theta0);
            y0 = [params.theta0; v_after];
            t_start = t_ode(end);
            
            % 在图形中添加碰撞点（相图中的跳跃）
            plot(data.ax2, [params.theta0, params.theta0], [v_before, v_after], 'k-');
        end
        
        % 提取θ和dθ/dt
        theta = all_y(:,1);
        dtheta = all_y(:,2);
        
        % 仅保留θ在[θ₀, π/2]之间的数据
        valid_idx = theta >= theta0 & theta <= pi/2;
        theta_valid = theta(valid_idx);
        dtheta_valid = dtheta(valid_idx);
        t_valid = all_t(valid_idx);
        
        % 绘制结果
        plot(data.ax1, t_valid, theta_valid, 'b-', 'LineWidth', 1.5, 'DisplayName', 'Solution');
        plot(data.ax2, theta_valid, dtheta_valid, 'b-', 'LineWidth', 1.5, 'DisplayName', 'Trajectory');
        
        % 更新坐标轴标签
        title(data.ax1, sprintf('\\theta vs Time (\\theta_0 = %.4f)', theta0));
        title(data.ax2, 'Phase Diagram');
    end

    % 微分方程定义
    function dydt = odefunc(t, y, p)
        theta = y(1);
        dtheta = y(2);
        
        % 计算系数
        denom = 5*p.R^2 + 3*p.L^2;
        A = (3*p.a0*p.omega^2) / denom;
        B = (3*p.g) / denom;
        
        % 角加速度
        ddtheta = - (A * cos(p.omega*t) + B) * sin(theta);
        
        dydt = [dtheta; ddtheta];
    end

    % 事件函数（检测θ = θ₀且速度向下）
    function [value, isterminal, direction] = events(t, y, p)
        theta = y(1);
        dtheta = y(2);
        
        % 事件1: θ下降到θ₀
        value(1) = theta - p.theta0;
        isterminal(1) = 1;  % 终止积分
        direction(1) = -1;  % 负方向穿越（θ减小）
        
        % 事件2: θ上升到π/2（可选，这里用于完整性）
        value(2) = theta - pi/2;
        isterminal(2) = 1;
        direction(2) = 1;   % 正方向穿越（θ增大）
    end
end