function PendulumSimulator2
    % 创建主窗口
    fig = uifigure('Name', '摆的运动模拟', 'Position', [100, 100, 1200, 700]);
    
    % 创建输入面板
    inputPanel = uipanel(fig, 'Position', [20, 20, 350, 650], 'Title', '参数设置');
    
    % 创建参数输入控件
    uilabel(inputPanel, 'Text', '半径 R:', 'Position', [30, 600, 100, 22]);
    R_edit = uieditfield(inputPanel, 'numeric', 'Value', 0.5, 'Position', [130, 600, 100, 22]);
    
    uilabel(inputPanel, 'Text', '长度 L:', 'Position', [30, 560, 100, 22]);
    L_edit = uieditfield(inputPanel, 'numeric', 'Value', 1.0, 'Position', [130, 560, 100, 22]);
    
    uilabel(inputPanel, 'Text', '重力 g:', 'Position', [30, 520, 100, 22]);
    g_edit = uieditfield(inputPanel, 'numeric', 'Value', 9.8, 'Position', [130, 520, 100, 22]);
    
    uilabel(inputPanel, 'Text', '振幅 a₀:', 'Position', [30, 480, 100, 22]);
    a0_edit = uieditfield(inputPanel, 'numeric', 'Value', 0.1, 'Position', [130, 480, 100, 22]);
    
    uilabel(inputPanel, 'Text', '频率 ω:', 'Position', [30, 440, 100, 22]);
    omega_edit = uieditfield(inputPanel, 'numeric', 'Value', 5, 'Position', [130, 440, 100, 22]);
    
    uilabel(inputPanel, 'Text', '初始角度 (rad):', 'Position', [30, 400, 100, 22]);
    theta_init_edit = uieditfield(inputPanel, 'numeric', 'Value', 1.0, 'Position', [130, 400, 100, 22]);
    
    uilabel(inputPanel, 'Text', '初始角速度:', 'Position', [30, 360, 100, 22]);
    dtheta_init_edit = uieditfield(inputPanel, 'numeric', 'Value', 0, 'Position', [130, 360, 100, 22]);
    
    uilabel(inputPanel, 'Text', '模拟时间:', 'Position', [30, 320, 100, 22]);
    tmax_edit = uieditfield(inputPanel, 'numeric', 'Value', 10, 'Position', [130, 320, 100, 22]);
    
    % 创建计算按钮
    calcBtn = uibutton(inputPanel, 'push', 'Text', '开始模拟', ...
        'Position', [100, 250, 120, 30], 'ButtonPushedFcn', @(btn,event) runSimulation);
    
    % 创建坐标区域
    ax1 = uiaxes(fig, 'Position', [400, 380, 750, 280]);
    ax2 = uiaxes(fig, 'Position', [400, 50, 750, 280]);
    
    % 存储UI组件的结构体
    uiData.R_edit = R_edit;
    uiData.L_edit = L_edit;
    uiData.g_edit = g_edit;
    uiData.a0_edit = a0_edit;
    uiData.omega_edit = omega_edit;
    uiData.theta_init_edit = theta_init_edit;
    uiData.dtheta_init_edit = dtheta_init_edit;
    uiData.tmax_edit = tmax_edit;
    uiData.ax1 = ax1;
    uiData.ax2 = ax2;
    
    guidata(fig, uiData);
    
    % 初始化模拟
    runSimulation();
    
    function runSimulation(~,~)
        % 获取UI数据
        uiData = guidata(fig);
        
        % 读取参数值
        R = uiData.R_edit.Value;
        L = uiData.L_edit.Value;
        g = uiData.g_edit.Value;
        a0 = uiData.a0_edit.Value;
        omega = uiData.omega_edit.Value;
        theta_init = uiData.theta_init_edit.Value;
        dtheta_init = uiData.dtheta_init_edit.Value;
        tmax = uiData.tmax_edit.Value;
        
        % 计算θ₀
        theta0 = asin(R/(R+L));
        
        % 检查初始角度是否在范围内
        if theta_init <= theta0 || theta_init >= pi/2
            errordlg('初始角度必须在θ₀和π/2之间!', '输入错误');
            return;
        end
        
        % 计算常数A和B
        denom = 5*R^2 + 3*L^2 + 6*L*R;
        A = (3*a0*omega^2)/denom;
        B = 3*g/denom;
        
        % 设置ODE求解器选项
        options = odeset('Events', @(t,y) events(t,y,theta0), 'RelTol', 1e-6, 'AbsTol', 1e-9);
        
        % 初始条件
        y0 = [theta_init; dtheta_init];
        
        % 时间向量
        tspan = [0 tmax];
        
        % 解ODE
        [t, y, te, ye, ie] = ode45(@(t,y) pendulumODE(t, y, A, B, omega), tspan, y0, options);
        
        % 处理事件（碰撞）
        while ~isempty(ie)
            % 碰撞事件
            if ie(end) == 1
                % 获取碰撞前状态
                theta_before = ye(end,1);
                dtheta_before = ye(end,2);
                
                % 应用碰撞条件
                dtheta_after = -dtheta_before * cos(2*theta0);
                
                % 新的初始条件
                y0 = [theta0; dtheta_after];
                
                % 从碰撞时间继续模拟
                tspan = [te(end) tmax];
                [t_new, y_new, te_new, ye_new, ie_new] = ode45(@(t,y) pendulumODE(t, y, A, B, omega), tspan, y0, options);
                
                % 合并结果
                t = [t; t_new(2:end)];
                y = [y; y_new(2:end,:)];
                te = [te; te_new];
                ye = [ye; ye_new];
                ie = [ie; ie_new];
            else
                break;
            end
        end
        
        % 过滤结果，仅保留θ₀到π/2之间的数据
        validIdx = y(:,1) >= theta0 & y(:,1) <= pi/2;
        t_valid = t(validIdx);
        y_valid = y(validIdx,:);
        
        % 绘制角度-时间图
        cla(uiData.ax1);
        plot(uiData.ax1, t_valid, y_valid(:,1), 'b-', 'LineWidth', 1.5);
        hold(uiData.ax1, 'on');
        yline(uiData.ax1, theta0, 'r--', 'LineWidth', 1.5, 'Label', 'θ₀');
        yline(uiData.ax1, pi/2, 'g--', 'LineWidth', 1.5, 'Label', 'π/2');
        hold(uiData.ax1, 'off');
        xlabel(uiData.ax1, '时间 (s)');
        ylabel(uiData.ax1, '角度 θ (rad)');
        title(uiData.ax1, '角度-时间图');
        legend(uiData.ax1, 'θ(t)', 'θ₀', 'π/2', 'Location', 'best');
        grid(uiData.ax1, 'on');
        
        % 绘制相图
        cla(uiData.ax2);
        plot(uiData.ax2, y_valid(:,1), y_valid(:,2), 'b-', 'LineWidth', 1.5);
        hold(uiData.ax2, 'on');
        xline(uiData.ax2, theta0, 'r--', 'LineWidth', 1.5, 'Label', 'θ₀');
        xline(uiData.ax2, pi/2, 'g--', 'LineWidth', 1.5, 'Label', 'π/2');
        hold(uiData.ax2, 'off');
        xlabel(uiData.ax2, '角度 θ (rad)');
        ylabel(uiData.ax2, '角速度 dθ/dt');
        title(uiData.ax2, '相图 (角度 vs 角速度)');
        legend(uiData.ax2, '相轨迹', 'θ₀', 'π/2', 'Location', 'best');
        grid(uiData.ax2, 'on');
    end

    % 定义微分方程
    function dydt = pendulumODE(t, y, A, B, omega)
        theta = y(1);
        dtheta = y(2);
        
        dydt = zeros(2,1);
        dydt(1) = dtheta;
        dydt(2) = - (A*cos(omega*t) + B) * sin(theta);
    end

    % 定义事件函数
    function [value, isterminal, direction] = events(t, y, theta0)
        theta = y(1);
        
        % 事件1：当θ=θ0且角速度为负（向下运动）时发生碰撞
        value(1) = theta - theta0;
        isterminal(1) = 1;   % 终止积分
        direction(1) = -1;   % 负方向（减小）时触发
        
        % 事件2：当θ=π/2时停止模拟
        value(2) = theta - pi/2;
        isterminal(2) = 1;   % 终止积分
        direction(2) = 1;    % 正方向（增大）时触发
    end
end
