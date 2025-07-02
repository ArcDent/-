function pendulum_simulator
    % 创建主窗口
    fig = figure('Name', 'Pendulum Simulator', 'Position', [100, 100, 1200, 700]);
    
    % 参数输入面板
    uipanel('Title', 'Parameters', 'Position', [0.02, 0.7, 0.3, 0.25]);
    uicontrol('Style', 'text', 'String', 'R:', 'Position', [30, 630, 60, 20], 'HorizontalAlignment', 'left');
    R_edit = uicontrol('Style', 'edit', 'Position', [100, 630, 80, 20], 'String', '0.5');
    uicontrol('Style', 'text', 'String', 'L:', 'Position', [30, 600, 60, 20], 'HorizontalAlignment', 'left');
    L_edit = uicontrol('Style', 'edit', 'Position', [100, 600, 80, 20], 'String', '0.5');
    uicontrol('Style', 'text', 'String', 'g:', 'Position', [30, 570, 60, 20], 'HorizontalAlignment', 'left');
    g_edit = uicontrol('Style', 'edit', 'Position', [100, 570, 80, 20], 'String', '9.8');
    uicontrol('Style', 'text', 'String', 'a0:', 'Position', [30, 540, 60, 20], 'HorizontalAlignment', 'left');
    a0_edit = uicontrol('Style', 'edit', 'Position', [100, 540, 80, 20], 'String', '1');
    uicontrol('Style', 'text', 'String', 'ω:', 'Position', [30, 510, 60, 20], 'HorizontalAlignment', 'left');
    w_edit = uicontrol('Style', 'edit', 'Position', [100, 510, 80, 20], 'String', '5');
    
    % 初始条件输入面板
    uipanel('Title', 'Initial Conditions', 'Position', [0.02, 0.4, 0.3, 0.25]);
    uicontrol('Style', 'text', 'String', 'Initial θ (rad):', 'Position', [30, 430, 100, 20], 'HorizontalAlignment', 'left');
    theta0_edit = uicontrol('Style', 'edit', 'Position', [130, 430, 80, 20], 'String', '0.01');
    uicontrol('Style', 'text', 'String', 'Initial dθ/dt:', 'Position', [30, 400, 100, 20], 'HorizontalAlignment', 'left');
    dtheta0_edit = uicontrol('Style', 'edit', 'Position', [130, 400, 80, 20], 'String', '0');
    uicontrol('Style', 'text', 'String', 'Total Time (s):', 'Position', [30, 370, 100, 20], 'HorizontalAlignment', 'left');
    t_total_edit = uicontrol('Style', 'edit', 'Position', [130, 370, 80, 20], 'String', '10');
    
    % 运行按钮
    run_btn = uicontrol('Style', 'pushbutton', 'String', 'Run Simulation', ...
        'Position', [100, 320, 120, 30], 'Callback', @run_simulation);
    
    % 绘图区域
    ax1 = subplot(2,1,1, 'Parent', fig, 'Position', [0.4, 0.55, 0.55, 0.35]);
    title(ax1, 'θ vs Time');
    xlabel(ax1, 'Time (s)');
    ylabel(ax1, 'θ (rad)');
    grid(ax1, 'on');
    
    ax2 = subplot(2,1,2, 'Parent', fig, 'Position', [0.4, 0.1, 0.55, 0.35]);
    title(ax2, 'Phase Portrait');
    xlabel(ax2, 'θ (rad)');
    ylabel(ax2, 'dθ/dt (rad/s)');
    grid(ax2, 'on');
    
    % 运行模拟的回调函数
    function run_simulation(~, ~)
        % 获取参数值
        R = str2double(get(R_edit, 'String'));
        L = str2double(get(L_edit, 'String'));
        g = str2double(get(g_edit, 'String'));
        a0 = str2double(get(a0_edit, 'String'));
        w = str2double(get(w_edit, 'String'));
        theta_initial = str2double(get(theta0_edit, 'String'));
        dtheta_initial = str2double(get(dtheta0_edit, 'String'));
        t_total = str2double(get(t_total_edit, 'String'));
        
        % 计算θ0 (碰撞角度)
        theta_collision = asin(R / (R + L));
        
        % 检查初始θ是否小于碰撞角度
        if theta_initial >= theta_collision
            errordlg('Initial θ must be less than collision angle θ₀.', 'Input Error');
            return;
        end
        
        % 设置ODE求解选项 (包括事件检测)
        options = odeset('Events', @(t,y) collision_events(t, y, theta_collision), 'RelTol', 1e-6);
        
        % 初始化存储数组
        T_all = [];
        Y_all = [];
        
        % 初始条件
        t_current = 0;
        y_current = [theta_initial; dtheta_initial];
        
        % 循环求解ODE (处理碰撞事件)
        while t_current < t_total
            % 求解ODE直到碰撞事件或结束时间
            [t_seg, y_seg, te, ye, ie] = ode45(@(t,y) pendulum_ode(t, y, R, L, g, a0, w), ...
                                               [t_current, t_total], y_current, options);
            
            % 存储当前段的结果
            T_all = [T_all; t_seg];
            Y_all = [Y_all; y_seg];
            
            % 如果没有事件发生，退出循环
            if isempty(te)
                break;
            end
            
            % 处理碰撞事件
            t_current = te(end);
            theta_before = ye(end, 1);
            dtheta_before = ye(end, 2);
            
            % 应用碰撞条件 (速度反向并乘以cos(2θ0))
            dtheta_after = -dtheta_before * cos(2 * theta_collision);
            y_current = [theta_before; dtheta_after];
            
            % 存储碰撞后的点 (为了绘图连续)
            T_all = [T_all; t_current];
            Y_all = [Y_all; y_current];
        end
        
        % 提取结果
        theta = Y_all(:, 1);
        dtheta = Y_all(:, 2);
        
        % 过滤θ在[0, π/2]之间的数据
        valid_idx = (theta >= 0) & (theta <= pi/2);
        t_valid = T_all(valid_idx);
        theta_valid = theta(valid_idx);
        dtheta_valid = dtheta(valid_idx);
        
        % 更新绘图
        cla(ax1);
        plot(ax1, t_valid, theta_valid, 'b-', 'LineWidth', 1.5);
        title(ax1, 'θ vs Time');
        xlabel(ax1, 'Time (s)');
        ylabel(ax1, 'θ (rad)');
        grid(ax1, 'on');
        hold(ax1, 'off');
        
        cla(ax2);
        plot(ax2, theta_valid, dtheta_valid, 'r-', 'LineWidth', 1.5);
        title(ax2, 'Phase Portrait');
        xlabel(ax2, 'θ (rad)');
        ylabel(ax2, 'dθ/dt (rad/s)');
        grid(ax2, 'on');
        hold(ax2, 'off');
    end

    % 定义ODE函数
    function dydt = pendulum_ode(t, y, R, L, g, a0, w)
        theta = y(1);
        dtheta = y(2);
        
        % 计算分母项
        denom = 5*R^2 + 3*L^2;
        
        % 计算角加速度
        term1 = (3*a0*w^2) / denom * cos(w*t);
        term2 = (3*g) / denom;
        ddtheta = (term1 + term2) * sin(theta);
        
        dydt = [dtheta; ddtheta];
    end

    % 定义碰撞事件函数
    function [value, isterminal, direction] = collision_events(t, y, theta_collision)
        theta = y(1);
        dtheta = y(2);
        
        % 检测θ达到碰撞角度且角度在增加
        value = theta - theta_collision;
        isterminal = 1;  % 触发事件时停止积分
        direction = 1;   % 只检测θ增加的方向
    end
end
