function PendulumSimulato3r()
    % 创建主窗口
    fig = figure('Name', '单摆碰撞模拟', 'Position', [100, 100, 1200, 800], 'NumberTitle', 'off');
    
    % 参数面板
    paramPanel = uipanel(fig, 'Title', '模拟参数', 'Position', [0.05, 0.1, 0.25, 0.8]);
    
    % R输入控件
    uicontrol(paramPanel, 'Style', 'text', 'String', 'R (半径):', ...
        'Units', 'normalized', 'Position', [0.1, 0.9, 0.3, 0.05]);
    R_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '0.1', ...
        'Units', 'normalized', 'Position', [0.5, 0.9, 0.4, 0.05]);
    
    % L输入控件
    uicontrol(paramPanel, 'Style', 'text', 'String', 'L (长度):', ...
        'Units', 'normalized', 'Position', [0.1, 0.8, 0.3, 0.05]);
    L_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '0.5', ...
        'Units', 'normalized', 'Position', [0.5, 0.8, 0.4, 0.05]);
    
    % g输入控件
    uicontrol(paramPanel, 'Style', 'text', 'String', 'g (重力加速度):', ...
        'Units', 'normalized', 'Position', [0.1, 0.7, 0.3, 0.05]);
    g_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '9.8', ...
        'Units', 'normalized', 'Position', [0.5, 0.7, 0.4, 0.05]);
    
    % a0输入控件
    uicontrol(paramPanel, 'Style', 'text', 'String', 'a₀ (加速度幅值):', ...
        'Units', 'normalized', 'Position', [0.1, 0.6, 0.3, 0.05]);
    a0_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '0', ...
        'Units', 'normalized', 'Position', [0.5, 0.6, 0.4, 0.05]);
    
    % ω输入控件 (倍数)
    uicontrol(paramPanel, 'Style', 'text', 'String', 'ω (角速度，π的倍数):', ...
        'Units', 'normalized', 'Position', [0.1, 0.5, 0.3, 0.05]);
    omega_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '1', ...
        'Units', 'normalized', 'Position', [0.5, 0.5, 0.4, 0.05]);
    
    % 初始角度输入控件 (倍数)
    uicontrol(paramPanel, 'Style', 'text', 'String', '初始角度 (π的倍数):', ...
        'Units', 'normalized', 'Position', [0.1, 0.4, 0.3, 0.05]);
    theta_init_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '0.3', ...
        'Units', 'normalized', 'Position', [0.5, 0.4, 0.4, 0.05]);
    
    % 计算临界角θ0
    uicontrol(paramPanel, 'Style', 'text', 'String', '临界角 θ₀ (计算值):', ...
        'Units', 'normalized', 'Position', [0.1, 0.25, 0.5, 0.05]);
    theta0_display = uicontrol(paramPanel, 'Style', 'text', 'String', '', ...
        'Units', 'normalized', 'Position', [0.1, 0.2, 0.8, 0.05]);
    
    % 开始按钮
    run_btn = uicontrol(paramPanel, 'Style', 'pushbutton', 'String', '开始模拟', ...
        'Units', 'normalized', 'Position', [0.3, 0.05, 0.4, 0.08], 'Callback', @runSimulation);
    
    % 结果面板
    resultsPanel = uipanel(fig, 'Title', '模拟结果', 'Position', [0.35, 0.1, 0.6, 0.8]);
    
    % θ-t图轴
    theta_ax = axes('Parent', resultsPanel, 'Position', [0.1, 0.55, 0.85, 0.4]);
    title(theta_ax, '\theta - t 图');
    xlabel(theta_ax, '时间 (s)');
    ylabel(theta_ax, '\theta (rad)');
    hold(theta_ax, 'on');
    
    % 相图轴
    phase_ax = axes('Parent', resultsPanel, 'Position', [0.1, 0.1, 0.85, 0.4]);
    title(phase_ax, '相图 (\dot\theta vs \theta)');
    xlabel(phase_ax, '\theta (rad)');
    ylabel(phase_ax, '\dot\theta (rad/s)');
    hold(phase_ax, 'on');
    
    % 更新临界角显示
    updateTheta0();
    
    % 当参数改变时自动更新临界角
    set(R_edit, 'Callback', @(src,~) updateTheta0());
    set(L_edit, 'Callback', @(src,~) updateTheta0());
    
    function updateTheta0()
        R = str2double(get(R_edit, 'String'));
        L = str2double(get(L_edit, 'String'));
        if ~isnan(R) && ~isnan(L) && R>0 && L>0
            theta0_val = asin(R/(R + L));
            set(theta0_display, 'String', sprintf('%.4f rad (约 %.2f°)', theta0_val, rad2deg(theta0_val)));
        end
    end

    function runSimulation(~, ~)
        % 读取参数
        R = str2double(get(R_edit, 'String'));
        L = str2double(get(L_edit, 'String'));
        g_val = str2double(get(g_edit, 'String'));
        a0_val = str2double(get(a0_edit, 'String'));
        w_factor = str2double(get(omega_edit, 'String'));
        theta_factor = str2double(get(theta_init_edit, 'String'));
        
        if any(isnan([R, L, g_val, a0_val, w_factor, theta_factor])) || ...
                R<=0 || L<=0
            errordlg('请检查参数！所有参数必须是正数且有效。');
            return;
        end
        
        theta0 = asin(R/(R + L));              % 临界角θ0
        w_val = w_factor * pi;                 % ω的实际值
        theta_initial = theta_factor * pi;     % 初始角度实际值
        
        % 检查初始角度是否在范围内
        if theta_initial <= theta0 || theta_initial >= pi/2
            errordlg(sprintf('初始角度必须在 θ₀(%.4f) 和 π/2(1.5708) 之间!', theta0));
            return;
        end
        
        % 计算物理常量
        D = 5*R^2 + 3*L^2 + 6*L*R;            % 分母常数
        k1 = 3*a0_val*w_val^2 / D;             % cos项系数
        k2 = 3*g_val / D;                      % sin项系数
        
        % 初始化变量
        tspan = [0, 20];    % 时间范围（秒）
        options = odeset('Events', @events, 'MaxStep', 0.01);
        y0 = [theta_initial; 0];               % 初始状态：[θ, θ']
        tee = [];                               % 事件时间
        yee = [];                               % 事件状态
        all_t = [];                             % 保存所有时间
        all_y = [];                             % 保存所有状态
        
        % 主模拟循环（处理多次碰撞）
        while tspan(1) < tspan(2)
            [t, y, te, ye, ie] = ode45(@(t, y) pendulumODE(t, y, k1, k2, w_val), tspan, y0, options);
            
            % 保存结果
            all_t = [all_t; t];
            all_y = [all_y; y];
            
            if ~isempty(te)
                tee = [tee; te];
                yee = [yee; ye];
                
                % 碰撞事件处理
                if ie(end) == 1
                    % 碰撞时刻计算新速度
                    prev_vel = y(end, 2);
                    new_vel = -prev_vel * cos(2*theta0);
                    y0 = [theta0; new_vel];  % 重置初始条件为碰撞后的状态
                    tspan = [te(end), tspan(2)]; % 继续从碰撞时间开始模拟
                end
            else
                break; % 无事件，退出循环
            end
        end
        
        % 绘图
        plotResults(all_t, all_y, theta0);
    end

    % 微分方程定义
    function dydt = pendulumODE(~, y, k1, k2, w)
        theta = y(1);
        dtheta = y(2);
        d2theta = -k1 * cos(w) - k2 * sin(theta); % 更新运动方程
        
        dydt = [dtheta; d2theta];
    end

    % 事件函数（检测临界角和π/2）
    function [value, isterminal, direction] = events(~, y)
        theta = y(1);
        value = [theta - theta0;    % 接近临界角θ0（下降时检查）
                theta - pi/2];      % 超过π/2时检查
        
        isterminal = [1;             % 达到临界角时停止积分（处理碰撞）
                     1];             % 超过π/2时停止积分
        
        direction = [-1;             % 只检测向下通过θ0 (导数负时)
                    1];              % 只检测向上通过π/2 (导数正时)
    end

    % 结果绘图函数
    function plotResults(t, y, theta0)
        % 绘制θ-t图
        axes(theta_ax);
        cla;
        plot(theta_ax, t, y(:,1), 'b-', 'LineWidth', 1.5);
        hold on;
        
        % 标记参考线θ0和π/2
        plot(theta_ax, [min(t), max(t)], [theta0, theta0], 'r--', 'LineWidth', 1.5);
        plot(theta_ax, [min(t), max(t)], [pi/2, pi/2], 'g--', 'LineWidth', 1.5);
        text(theta_ax, max(t)*0.95, theta0+0.05, sprintf('\\theta_0=%.4f', theta0), 'Color', 'r', 'FontSize',10);
        text(theta_ax, max(t)*0.95, pi/2-0.05, sprintf('\\pi/2=%.4f', pi/2), 'Color', 'g', 'FontSize',10);
        hold off;
        legend(theta_ax, {'\theta(t)', '\theta_0 参考线', '\pi/2 参考线'}, 'Location', 'best');
        title(theta_ax, '\theta - t 曲线');
        
        % 绘制相图（角速度 vs 角度）
        axes(phase_ax);
        cla;
        plot(phase_ax, y(:,1), y(:,2), 'b-', 'LineWidth', 1.5);
        hold on;
        
        % 标记参考线θ0和π/2
        ylim = get(phase_ax, 'YLim');
        plot(phase_ax, [theta0, theta0], ylim, 'r--', 'LineWidth', 1.5);
        plot(phase_ax, [pi/2, pi/2], ylim, 'g--', 'LineWidth', 1.5);
        text(phase_ax, theta0+0.05, max(ylim)*0.9, '\theta_0', 'Color', 'r');
        text(phase_ax, pi/2+0.05, max(ylim)*0.9, '\pi/2', 'Color', 'g');
        hold off;
        title(phase_ax, '相图 (角速度 \dot\theta 与角度 \theta 的关系)');
        xlim(phase_ax, [theta0*0.9, pi/2*1.1]);
        grid on;
    end
end
