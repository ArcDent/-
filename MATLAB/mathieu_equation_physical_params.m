function mathieu_equation_physical_params
    % 创建图形界面
    fig = figure('Name', '马蒂厄方程可视化 - 物理参数', 'NumberTitle', 'off', ...
                 'Position', [100, 100, 900, 700]);
    
    % 默认物理参数
    default_omega = 2;     % 驱动频率 (rad/s)
    default_A = 0.1;       % 驱动振幅 (m)
    default_g = 9.81;      % 重力加速度 (m/s²)
    default_l = 1;         % 摆长 (m)
    default_tspan = [0, 50]; % 时间范围
    default_x0 = [1; 0];   % 初始条件 [x(0); x'(0)]
    
    % 创建控件
    uicontrol('Style', 'text', 'Position', [20, 650, 150, 20], ...
              'String', '驱动频率 ω (rad/s):', 'HorizontalAlignment', 'left');
    omega_slider = uicontrol('Style', 'slider', 'Position', [20, 630, 200, 20], ...
                         'Min', 0.1, 'Max', 5, 'Value', default_omega, ...
                         'Callback', @update_plot);
    omega_text = uicontrol('Style', 'text', 'Position', [230, 630, 50, 20], ...
                       'String', num2str(default_omega));
    
    uicontrol('Style', 'text', 'Position', [20, 600, 150, 20], ...
              'String', '驱动振幅 A (m):', 'HorizontalAlignment', 'left');
    A_slider = uicontrol('Style', 'slider', 'Position', [20, 580, 200, 20], ...
                         'Min', 0, 'Max', 0.5, 'Value', default_A, ...
                         'Callback', @update_plot);
    A_text = uicontrol('Style', 'text', 'Position', [230, 580, 50, 20], ...
                       'String', num2str(default_A));
    
    uicontrol('Style', 'text', 'Position', [20, 550, 150, 20], ...
              'String', '重力加速度 g (m/s²):', 'HorizontalAlignment', 'left');
    g_slider = uicontrol('Style', 'slider', 'Position', [20, 530, 200, 20], ...
                         'Min', 1, 'Max', 20, 'Value', default_g, ...
                         'Callback', @update_plot);
    g_text = uicontrol('Style', 'text', 'Position', [230, 530, 50, 20], ...
                       'String', num2str(default_g));
    
    uicontrol('Style', 'text', 'Position', [20, 500, 150, 20], ...
              'String', '摆长 l (m):', 'HorizontalAlignment', 'left');
    l_slider = uicontrol('Style', 'slider', 'Position', [20, 480, 200, 20], ...
                         'Min', 0.1, 'Max', 5, 'Value', default_l, ...
                         'Callback', @update_plot);
    l_text = uicontrol('Style', 'text', 'Position', [230, 480, 50, 20], ...
                       'String', num2str(default_l));
    
    % 创建绘图区域
    ax1 = subplot(3,1,1);
    ax2 = subplot(3,1,2);
    ax3 = subplot(3,1,3);
    
    % 初始绘图
    update_plot();
    
    % 更新绘图函数
    function update_plot(~,~)
        % 获取当前参数值
        omega = get(omega_slider, 'Value');
        A = get(A_slider, 'Value');
        g = get(g_slider, 'Value');
        l = get(l_slider, 'Value');
        
        % 更新文本显示
        set(omega_text, 'String', num2str(omega, '%.2f'));
        set(A_text, 'String', num2str(A, '%.2f'));
        set(g_text, 'String', num2str(g, '%.2f'));
        set(l_text, 'String', num2str(l, '%.2f'));
        
        % 计算马蒂厄方程参数
        a = g / l;
        b = A * omega^2 / l;
        
        % 解马蒂厄方程
        [t, x] = solve_mathieu(a, b, default_tspan, default_x0);
        
        % 绘制解
        plot(ax1, t, x(:,1), 'b', 'LineWidth', 1.5);
        xlabel(ax1, '时间 t (s)');
        ylabel(ax1, '角度 θ(t) (rad)');
        title(ax1, sprintf('摆的角度随时间变化: ω=%.2f rad/s, A=%.2f m, g=%.2f m/s², l=%.2f m', ...
              omega, A, g, l));
        grid(ax1, 'on');
        
        % 绘制相图
        plot(ax2, x(:,1), x(:,2), 'r', 'LineWidth', 1.5);
        xlabel(ax2, '角度 θ (rad)');
        ylabel(ax2, '角速度 dθ/dt (rad/s)');
        title(ax2, '相图');
        grid(ax2, 'on');
        
        % 绘制参数信息
        cla(ax3);
        text(ax3, 0.1, 0.8, sprintf('马蒂厄方程参数:\na = g/l = %.2f\nb = Aω²/l = %.2f', a, b), ...
             'FontSize', 12);
        text(ax3, 0.1, 0.5, sprintf('自然频率:\nω₀ = √(g/l) = %.2f rad/s\n驱动频率比: ω/ω₀ = %.2f', ...
             sqrt(g/l), omega/sqrt(g/l)), 'FontSize', 12);
        axis(ax3, 'off');
        
        % 调整坐标轴范围
        y_lim = max(abs(x(:,1))) * 1.1;
        if y_lim == 0, y_lim = 1; end
        ylim(ax1, [-y_lim, y_lim]);
        
        % 稳定性分析
        if max(abs(x(:,1))) > 10
            annotation('textbox', [0.7, 0.85, 0.2, 0.1], 'String', ...
                     '不稳定解 (参数共振)', 'EdgeColor', 'r', 'Color', 'r', 'FontSize', 12);
        else
            annotation('textbox', [0.7, 0.85, 0.2, 0.1], 'String', ...
                     '稳定解', 'EdgeColor', 'g', 'Color', 'g', 'FontSize', 12);
        end
    end
    
    % 解马蒂厄方程的函数
    function [t, x] = solve_mathieu(a, b, tspan, x0)
        options = odeset('RelTol', 1e-6, 'AbsTol', 1e-8);
        [t, x] = ode45(@(t,x) mathieu_ode(t,x,a,b), tspan, x0, options);
    end
    
    % 马蒂厄方程的ODE定义
    function dxdt = mathieu_ode(t, x, a, b)
        dxdt = [x(2);               % dx/dt = v
               -(a + b*cos(t))*x(1)]; % dv/dt = -(a + b*cos(t))*x
    end
end