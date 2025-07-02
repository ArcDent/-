function collision_pendulum_simulator
    % 创建主窗口
    fig = figure('Name', '碰撞摆模拟', 'NumberTitle', 'off', ...
                 'Position', [100, 100, 1200, 700], 'Resize', 'off');
    
    % 参数输入面板
    paramPanel = uipanel('Title', '参数设置', 'Position', [0.02, 0.02, 0.3, 0.96]);
    
    % 参数默认值
    defaults = struct(...
        'R', 0.5, ...
        'L', 0.5, ...
        'g', 9.8, ...
        'a0', 1.0, ...
        'omega', 2*pi, ...
        'theta_init_deg', 60, ... % 初始角度（度）
        'dtheta0', 0, ...         % 初始角速度
        'T_total', 10 ...         % 总时间
    );
    
    % 创建参数输入控件
    yPos = 0.85;
    paramNames = {'R (摆杆半径):', 'L (摆杆长度):', 'g (重力加速度):', 'a0 (振幅):', ...
                  'ω (驱动频率):', '初始角度 (度):', '初始角速度:', '总时间:'};
    fields = {'R', 'L', 'g', 'a0', 'omega', 'theta_init_deg', 'dtheta0', 'T_total'};
    for i = 1:length(paramNames)
        uicontrol('Style', 'text', 'Parent', paramPanel, 'String', paramNames{i}, ...
                  'Units', 'normalized', 'Position', [0.05, yPos, 0.4, 0.05], ...
                  'HorizontalAlignment', 'left');
        edit(i) = uicontrol('Style', 'edit', 'Parent', paramPanel, ...
                  'Units', 'normalized', 'Position', [0.5, yPos, 0.4, 0.05], ...
                  'String', num2str(defaults.(fields{i})), ...
                  'Tag', fields{i});
        yPos = yPos - 0.07;
    end
    
    % 计算并显示θ0
    uicontrol('Style', 'text', 'Parent', paramPanel, ...
              'String', 'θ₀ = asin(R/(R+L)) = ', ...
              'Units', 'normalized', 'Position', [0.05, yPos, 0.4, 0.05], ...
              'HorizontalAlignment', 'left');
    theta0Text = uicontrol('Style', 'text', 'Parent', paramPanel, ...
              'String', '', ...
              'Units', 'normalized', 'Position', [0.5, yPos, 0.4, 0.05], ...
              'HorizontalAlignment', 'left');
    yPos = yPos - 0.07;
    
    % 运行按钮
    runButton = uicontrol('Style', 'pushbutton', 'Parent', paramPanel, ...
                          'String', '运行模拟', ...
                          'Units', 'normalized', 'Position', [0.3, yPos, 0.4, 0.07], ...
                          'Callback', @runSimulation, ...
                          'FontWeight', 'bold');
    
    % 绘图区域
    ax1 = subplot(2,1,1, 'Parent', fig, 'Position', [0.35, 0.55, 0.62, 0.4]);
    title(ax1, '角度随时间变化 (θ-t)');
    xlabel(ax1, '时间 t (s)');
    ylabel(ax1, '角度 θ (rad)');
    grid(ax1, 'on');
    hold(ax1, 'on');
    
    ax2 = subplot(2,1,2, 'Parent', fig, 'Position', [0.35, 0.05, 0.62, 0.4]);
    title(ax2, '相图 (角速度 vs 角度)');
    xlabel(ax2, '角度 θ (rad)');
    ylabel(ax2, '角速度 dθ/dt (rad/s)');
    grid(ax2, 'on');
    hold(ax2, 'on');
    
    % 更新θ0显示
    updateTheta0();
    
    % 参数编辑框回调（更新θ0）
    for i = 1:length(edit)
        set(edit(i), 'Callback', @(src,event) updateTheta0());
    end
    
    function updateTheta0()
        % 读取R和L
        R = str2double(get(edit(1), 'String'));
        L = str2double(get(edit(2), 'String'));
        % 计算θ0
        theta0 = asin(R/(R+L));
        set(theta0Text, 'String', sprintf('%.4f rad (≈%.1f°)', theta0, rad2deg(theta0)));
    end

    function runSimulation(~, ~)
        % 清除之前图形
        cla(ax1);
        cla(ax2);
        
        % 读取参数
        params.R = str2double(get(edit(1), 'String'));
        params.L = str2double(get(edit(2), 'String'));
        params.g = str2double(get(edit(3), 'String'));
        params.a0 = str2double(get(edit(4), 'String'));
        params.omega = str2double(get(edit(5), 'String'));
        theta_init_deg = str2double(get(edit(6), 'String'));
        dtheta0 = str2double(get(edit(7), 'String'));
        T_total = str2double(get(edit(8), 'String'));
        
        % 计算θ0和初始角度（转换为弧度）
        theta0 = asin(params.R/(params.R+params.L));
        theta_init = deg2rad(theta_init_deg);
        
        % 检查初始角度范围
        if theta_init <= theta0 || theta_init >= pi/2
            errordlg(sprintf('初始角度必须满足: θ₀ < θ < π/2 (%.4f < θ < %.4f)', theta0, pi/2), '输入错误');
            return;
        end
        
        % 初始条件
        y0 = [theta_init; dtheta0];
        
        % 设置ODE求解器选项（事件检测）
        options = odeset('Events', @(t,y) collisionEvent(t,y,theta0), 'RelTol', 1e-6);
        
        % 初始化解数组
        sol_t = [];
        sol_y = [];
        teout = [];
        yeout = [];
        
        % 时间设置
        t_start = 0;
        t_end = T_total;
        maxEvents = 100; % 最大碰撞事件次数
        eventCount = 0;
        
        % 主求解循环（处理碰撞事件）
        while t_start < t_end && eventCount < maxEvents
            [t, y, te, ye, ie] = ode45(@(t,y) pendulumODE(t,y,params), [t_start, t_end], y0, options);
            
            % 存储解
            sol_t = [sol_t; t];
            sol_y = [sol_y; y];
            
            if ~isempty(te)
                % 记录事件点
                teout = [teout; te];
                yeout = [yeout; ye];
                
                % 应用碰撞条件：速度反向并乘以系数
                dtheta_after = -ye(2) * cos(2*theta0);
                y0 = [theta0; dtheta_after]; % 新初始条件
                
                t_start = te(end); % 从碰撞时间继续
                eventCount = eventCount + 1;
            else
                break; % 无事件，退出循环
            end
        end
        
        % 绘图
        plot(ax1, sol_t, sol_y(:,1), 'b-', 'LineWidth', 1.5);
        plot(ax1, [0, T_total], [theta0, theta0], 'r--', 'LineWidth', 1.5);
        plot(ax1, [0, T_total], [pi/2, pi/2], 'g--', 'LineWidth', 1.5);
        legend(ax1, {'θ(t)', 'θ₀', 'π/2'}, 'Location', 'best');
        
        plot(ax2, sol_y(:,1), sol_y(:,2), 'b-', 'LineWidth', 1.5);
        plot(ax2, [theta0, theta0], ylim(ax2), 'r--', 'LineWidth', 1.5);
        plot(ax2, [pi/2, pi/2], ylim(ax2), 'g--', 'LineWidth', 1.5);
        legend(ax2, {'相轨迹', 'θ₀', 'π/2'}, 'Location', 'best');
        
        % 标记碰撞点
        if ~isempty(teout)
            plot(ax1, teout, yeout(:,1), 'ro', 'MarkerSize', 8, 'MarkerFaceColor', 'r');
            plot(ax2, yeout(:,1), yeout(:,2), 'ro', 'MarkerSize', 8, 'MarkerFaceColor', 'r');
        end
    end

    function dydt = pendulumODE(t, y, params)
        % 二阶微分方程
        theta = y(1);
        dtheta = y(2);
        
        % 计算分母项
        denom = 5*params.R^2 + 3*params.L^2;
        
        % 计算驱动项
        drive_term = (3*params.a0*params.omega^2/denom) * cos(params.omega*t) + ...
                     (3*params.g/denom);
        
        % 方程定义
        dydt = [dtheta; 
                drive_term * sin(theta)];
    end

    function [value, isterminal, direction] = collisionEvent(t, y, theta0)
        % 碰撞事件函数
        theta = y(1);
        dtheta = y(2);
        
        % 事件条件：θ = θ0 且 角速度为负（向下运动）
        value = theta - theta0;
        isterminal = 1; % 终止积分
        direction = -1; % 只检测下降过零点
    end
end
