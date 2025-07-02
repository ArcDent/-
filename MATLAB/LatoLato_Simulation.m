function LatoLato_Simulation
    % 创建主窗口
    fig = figure('Name', 'LATOLATO振荡模拟', 'Position', [100, 100, 1200, 800], 'NumberTitle', 'off');
    
    % 创建参数输入面板
    paramPanel = uipanel(fig, 'Title', '参数设置', 'Position', [0.02, 0.7, 0.3, 0.25]);
    
    % 参数默认值
    defaults = struct(...
        'R', 0.1, 'L', 0.2, 'g', 9.8, 'a0', 1, 'omega', 10, ...
        'theta_init', 0.8, 'theta_dot_init', 0, 'T_max', 20);
    
    % 创建输入控件
    params = {'R (球半径)', 'L (杆长)', 'g (重力加速度)', 'a0 (输入振幅)', 'omega (角频率)', ...
              'theta_init (初始角度)', 'theta_dot_init (初始角速度)', 'T_max (总时间)'};
    fields = {'R', 'L', 'g', 'a0', 'omega', 'theta_init', 'theta_dot_init', 'T_max'};
    ypos = linspace(0.85, 0.05, length(params));
    
    for i = 1:length(params)
        uicontrol(paramPanel, 'Style', 'text', 'String', params{i}, ...
                  'Units', 'normalized', 'Position', [0.05, ypos(i), 0.4, 0.1]);
        edit.(fields{i}) = uicontrol(paramPanel, 'Style', 'edit', ...
                  'String', num2str(defaults.(fields{i})), ...
                  'Units', 'normalized', 'Position', [0.5, ypos(i), 0.4, 0.1]);
    end
    
    % 模拟按钮
    simBtn = uicontrol(fig, 'Style', 'pushbutton', 'String', '开始模拟', ...
        'Units', 'normalized', 'Position', [0.12, 0.65, 0.1, 0.04], ...
        'Callback', @runSimulation);
    
    % 创建坐标轴
    ax1 = subplot(2,1,1, 'Parent', fig, 'Position', [0.35, 0.55, 0.6, 0.35]);
    title(ax1, '\theta 随时间变化');
    xlabel(ax1, '时间 (s)');
    ylabel(ax1, '\theta (rad)');
    grid(ax1, 'on');
    hold(ax1, 'on');
    
    ax2 = subplot(2,1,2, 'Parent', fig, 'Position', [0.35, 0.1, 0.6, 0.35]);
    title(ax2, '相图: 角速度 vs \theta');
    xlabel(ax2, '\theta (rad)');
    ylabel(ax2, 'd\theta/dt (rad/s)');
    grid(ax2, 'on');
    hold(ax2, 'on');
    
    % 存储句柄
    handles = struct('ax1', ax1, 'ax2', ax2, 'edit', edit);
    guidata(fig, handles);

    % 模拟函数
    function runSimulation(~, ~)
        % 获取句柄
        handles = guidata(gcf);
        ax1 = handles.ax1; ax2 = handles.ax2;
        edit = handles.edit;
        
        % 清除旧图形
        cla(ax1); cla(ax2);
        
        % 读取参数
        params = struct();
        fields = fieldnames(edit);
        for i = 1:length(fields)
            params.(fields{i}) = str2double(get(edit.(fields{i}), 'String'));
        end
        
        R = params.R; L = params.L; g = params.g; a0 = params.a0;
        omega = params.omega; T_max =params.T_max;
        theta_init = params.theta_init; theta_dot_init = params.theta_dot_init;
        
        % 计算临界角度θ₀
        theta0 = asin(R/(R + L));
        
        % 验证初始角度
        if theta_init <= theta0 || theta_init >= pi/2
            errordlg(sprintf('初始角度必须介于 %.4f 和 %.4f 之间', theta0, pi/2), '输入错误');
            return;
        end
        
        % 碰撞系数
        cos2theta0 = cos(2*theta0);
        
        % 初始化ODE求解
        t0 = 0;
        y0 = [theta_init; theta_dot_init];
        T_total = [];
        Y_total = [];
        
        % 设置ODE选项（事件检测）
        options = odeset('Events', @(t,y) collisionEvents(t, y, theta0));
        
        % 主求解循环
        while t0 < T_max
            [t, y, te, ye, ie] = ode45(@(t,y) pendulumODE(t, y, R, L, g, a0, omega), ...
                                       [t0, T_max], y0, options);
            
            % 存储结果
            T_total = [T_total; t];
            Y_total = [Y_total; y];
            
            % 处理碰撞事件
            if ~isempty(te)
                % 提取碰撞点状态
                theta_coll = ye(1);
                theta_dot_coll = ye(2);
                
                % 计算碰撞后速度
                theta_dot_after = -theta_dot_coll * cos2theta0;
                
                % 更新初始条件（碰撞后）
                y0 = [theta_coll; theta_dot_after];
                t0 = te(end);
                
                % 在结果中标记碰撞点（用于可视化）
                T_total = [T_total; t0];
                Y_total = [Y_total; [theta_coll, theta_dot_after]];
            else
                break; % 无事件，结束求解
            end
        end
        
        % 提取结果
        theta = Y_total(:,1);
        theta_dot = Y_total(:,2);
        
        % 绘制θ-t图
        plot(ax1, T_total, theta, 'b-', 'LineWidth', 1.5);
        plot(ax1, [min(T_total), max(T_total)], [theta0, theta0], 'r--', 'LineWidth', 1.5);
        plot(ax1, [min(T_total), max(T_total)], [pi/2, pi/2], 'g--', 'LineWidth', 1.5);
        legend(ax1, '\theta(t)', '\theta_0', '\pi/2', 'Location', 'best');
        ylim(ax1, [theta0*0.9, pi/2*1.1]);
        
        % 绘制相图
        plot(ax2, theta, theta_dot, 'b-', 'LineWidth', 1.5);
        plot(ax2, [theta0, theta0], [min(theta_dot), max(theta_dot)], 'r--', 'LineWidth', 1.5);
        plot(ax2, [pi/2, pi/2], [min(theta_dot), max(theta_dot)], 'g--', 'LineWidth', 1.5);
        legend(ax2, '相轨迹', '\theta_0', '\pi/2', 'Location', 'best');
        xlim(ax2, [theta0*0.9, pi/2*1.1]);
        
        % 添加网格和标签
        grid(ax1, 'on'); grid(ax2, 'on');
    end

    % 碰撞事件函数
    function [value, isterminal, direction] = collisionEvents(t, y, theta0)
        theta = y(1);
        theta_dot = y(2);
        
        % 检测条件：θ=θ₀且角速度为负（向下运动）
        value = theta - theta0;
        isterminal = 1; % 终止积分
        direction = -1; % 仅检测下降穿越
    end

    % 摆的微分方程
    function dydt = pendulumODE(t, y, R, L, g, a0, omega)
        theta = y(1);
        % theta_dot = y(2); % 未使用
        
        % 计算系数
        denominator = 5*R^2 + 3*L^2;
        coeff = (3*a0*omega^2)/denominator * cos(omega*t) + (3*g)/denominator;
        
        % 微分方程组
        dydt = [y(2);                     % dθ/dt = ω
                -coeff * sin(theta)];     % d²θ/dt² = -coeff*sin(θ)
    end
end
