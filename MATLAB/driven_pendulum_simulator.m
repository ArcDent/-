function mathieu_pendulum_visualization()
    % 创建主界面
    fig = figure('Name', 'Parametrically Driven Pendulum', 'NumberTitle', 'off', ...
                 'Position', [100, 100, 1200, 700], 'Color', [0.95 0.95 0.95]);
    
    % 默认参数值
    default_omega = 2;      % 驱动频率 (rad/s)
    default_a0 = 0.5;       % 驱动振幅 (m)
    default_g = 9.81;       % 重力加速度 (m/s²)
    default_l = 1.0;        % 杆长 (m)
    default_tmax = 20;      % 最大模拟时间 (s)
    
    % 创建控制面板
    control_panel = uipanel('Title', '参数控制', 'Position', [0.01 0.01 0.28 0.98], ...
                           'BackgroundColor', [0.9 0.92 0.95]);
    
    % 驱动频率控制
    uicontrol(control_panel, 'Style', 'text', 'Position', [20, 450, 150, 20], ...
              'String', 'ω (驱动频率, rad/s):', 'BackgroundColor', [0.9 0.92 0.95]);
    omega_slider = uicontrol(control_panel, 'Style', 'slider', 'Position', [20, 430, 200, 20], ...
                            'Min', 0, 'Max', 10, 'Value', default_omega, ...
                            'Callback', @update_plot);
    omega_text = uicontrol(control_panel, 'Style', 'edit', 'Position', [230, 430, 60, 20], ...
                          'String', num2str(default_omega), ...
                          'Callback', @omega_text_callback);
    
    % 驱动振幅控制
    uicontrol(control_panel, 'Style', 'text', 'Position', [20, 380, 150, 20], ...
              'String', 'a₀ (驱动振幅, m):', 'BackgroundColor', [0.9 0.92 0.95]);
    a0_slider = uicontrol(control_panel, 'Style', 'slider', 'Position', [20, 360, 200, 20], ...
                         'Min', 0.1, 'Max', 2, 'Value', default_a0, ...
                         'Callback', @update_plot);
    a0_text = uicontrol(control_panel, 'Style', 'edit', 'Position', [230, 360, 60, 20], ...
                       'String', num2str(default_a0), ...
                       'Callback', @a0_text_callback);
    
    % 重力加速度控制
    uicontrol(control_panel, 'Style', 'text', 'Position', [20, 310, 150, 20], ...
              'String', 'g (重力加速度, m/s²):', 'BackgroundColor', [0.9 0.92 0.95]);
    g_slider = uicontrol(control_panel, 'Style', 'slider', 'Position', [20, 290, 200, 20], ...
                        'Min', 1, 'Max', 20, 'Value', default_g, ...
                        'Callback', @update_plot);
    g_text = uicontrol(control_panel, 'Style', 'edit', 'Position', [230, 290, 60, 20], ...
                      'String', num2str(default_g), ...
                      'Callback', @g_text_callback);
    
    % 杆长控制
    uicontrol(control_panel, 'Style', 'text', 'Position', [20, 240, 150, 20], ...
              'String', 'l (杆长, m):', 'BackgroundColor', [0.9 0.92 0.95]);
    l_slider = uicontrol(control_panel, 'Style', 'slider', 'Position', [20, 220, 200, 20], ...
                        'Min', 0.3, 'Max', 3, 'Value', default_l, ...
                        'Callback', @update_plot);
    l_text = uicontrol(control_panel, 'Style', 'edit', 'Position', [230, 220, 60, 20], ...
                      'String', num2str(default_l), ...
                      'Callback', @l_text_callback);
    
    % 模拟时间控制
    uicontrol(control_panel, 'Style', 'text', 'Position', [20, 170, 150, 20], ...
              'String', '最大时间 (s):', 'BackgroundColor', [0.9 0.92 0.95]);
    tmax_slider = uicontrol(control_panel, 'Style', 'slider', 'Position', [20, 150, 200, 20], ...
                          'Min', 5, 'Max', 50, 'Value', default_tmax, ...
                          'Callback', @update_plot);
    tmax_text = uicontrol(control_panel, 'Style', 'edit', 'Position', [230, 150, 60, 20], ...
                         'String', num2str(default_tmax), ...
                         'Callback', @tmax_text_callback);
    
    % 初始角度控制
    uicontrol(control_panel, 'Style', 'text', 'Position', [20, 100, 150, 20], ...
              'String', '初始角度 (度):', 'BackgroundColor', [0.9 0.92 0.95]);
    theta0_slider = uicontrol(control_panel, 'Style', 'slider', 'Position', [20, 80, 200, 20], ...
                            'Min', 0, 'Max', 30, 'Value', 5, ...
                            'Callback', @update_plot);
    theta0_text = uicontrol(control_panel, 'Style', 'edit', 'Position', [230, 80, 60, 20], ...
                          'String', '5', ...
                          'Callback', @theta0_text_callback);
    
    % 创建绘图区域
    plot_panel = uipanel('Title', '可视化结果', 'Position', [0.3 0.01 0.69 0.98], ...
                        'BackgroundColor', [0.97 0.97 0.97]);
    
    % θ-t 曲线图
    ax1 = axes('Parent', plot_panel, 'Position', [0.1, 0.55, 0.85, 0.4]);
    title(ax1, '角度随时间变化');
    xlabel(ax1, '时间 (s)');
    ylabel(ax1, '角度 θ (rad)');
    grid(ax1, 'on');
    
    % 相图
    ax2 = axes('Parent', plot_panel, 'Position', [0.1, 0.08, 0.85, 0.4]);
    title(ax2, '相图 (θ vs dθ/dt)');
    xlabel(ax2, '角度 θ (rad)');
    ylabel(ax2, '角速度 dθ/dt (rad/s)');
    grid(ax2, 'on');
    
    % 状态指示器
    status_text = uicontrol(plot_panel, 'Style', 'text', 'Position', [400, 10, 300, 30], ...
                          'String', '当前状态：稳定解', 'FontSize', 12, ...
                          'BackgroundColor', [0.97 0.97 0.97], 'ForegroundColor', [0 0.5 0]);
    
    % 初始绘图
    update_plot();
    
    % 回调函数
    function omega_text_callback(src, ~)
        val = str2double(get(src, 'String'));
        if ~isnan(val) && val >= get(omega_slider, 'Min') && val <= get(omega_slider, 'Max')
            set(omega_slider, 'Value', val);
            update_plot();
        else
            set(src, 'String', num2str(get(omega_slider, 'Value')));
        end
    end
    
    function a0_text_callback(src, ~)
        val = str2double(get(src, 'String'));
        if ~isnan(val) && val >= get(a0_slider, 'Min') && val <= get(a0_slider, 'Max')
            set(a0_slider, 'Value', val);
            update_plot();
        else
            set(src, 'String', num2str(get(a0_slider, 'Value')));
        end
    end
    
    function g_text_callback(src, ~)
        val = str2double(get(src, 'String'));
        if ~isnan(val) && val >= get(g_slider, 'Min') && val <= get(g_slider, 'Max')
            set(g_slider, 'Value', val);
            update_plot();
        else
            set(src, 'String', num2str(get(g_slider, 'Value')));
        end
    end
    
    function l_text_callback(src, ~)
        val = str2double(get(src, 'String'));
        if ~isnan(val) && val >= get(l_slider, 'Min') && val <= get(l_slider, 'Max')
            set(l_slider, 'Value', val);
            update_plot();
        else
            set(src, 'String', num2str(get(l_slider, 'Value')));
        end
    end
    
    function tmax_text_callback(src, ~)
        val = str2double(get(src, 'String'));
        if ~isnan(val) && val >= get(tmax_slider, 'Min') && val <= get(tmax_slider, 'Max')
            set(tmax_slider, 'Value', val);
            update_plot();
        else
            set(src, 'String', num2str(get(tmax_slider, 'Value')));
        end
    end
    
    function theta0_text_callback(src, ~)
        val = str2double(get(src, 'String'));
        if ~isnan(val) && val >= get(theta0_slider, 'Min') && val <= get(theta0_slider, 'Max')
            set(theta0_slider, 'Value', val);
            update_plot();
        else
            set(src, 'String', num2str(get(theta0_slider, 'Value')));
        end
    end
    
    % 主更新函数
    function update_plot(~, ~)
        % 获取当前参数值
        omega = get(omega_slider, 'Value');
        a0 = get(a0_slider, 'Value');
        g = get(g_slider, 'Value');
        l = get(l_slider, 'Value');
        tmax = get(tmax_slider, 'Value');
        theta0_deg = get(theta0_slider, 'Value');
        theta0 = deg2rad(theta0_deg);  % 转换为弧度
        
        % 更新文本框
        set(omega_text, 'String', num2str(omega, '%.2f'));
        set(a0_text, 'String', num2str(a0, '%.2f'));
        set(g_text, 'String', num2str(g, '%.2f'));
        set(l_text, 'String', num2str(l, '%.2f'));
        set(tmax_text, 'String', num2str(tmax, '%d'));
        set(theta0_text, 'String', num2str(theta0_deg, '%.1f'));
        
        % 计算Mathieu参数
        a_param = g / l;
        b_param = a0 * omega^2 / l;
        
        % 时间向量
        t = linspace(0, tmax, 2000);
        
        % 初始条件 [θ, dθ/dt]
        x0 = [theta0; 0];
        
        % 求解运动方程
        [t, x] = ode45(@(t,x) pendulum_ode(t, x, a_param, b_param, omega), t, x0);
        
        % 提取角度和角速度
        theta = x(:,1);
        dtheta = x(:,2);
        
        % 使用Mathieu方程稳定性分析
        is_unstable = mathieu_stability(a_param, b_param, omega);
        
        % 更新状态指示器
        if is_unstable
            set(status_text, 'String', '当前状态：不稳定解 (参数共振)', 'ForegroundColor', [0.8 0 0]);
        else
            set(status_text, 'String', '当前状态：稳定解', 'ForegroundColor', [0 0.5 0]);
        end
        
        % 清除旧图形
        cla(ax1);
        cla(ax2);
        
        % 绘制图形（不再检查稳定解或不稳定解）
        % θ-t 曲线
        plot(ax1, t, theta, 'LineWidth', 1.8);
        title(ax1, sprintf('角度随时间变化 (ω=%.2f, a₀=%.2f, g=%.2f, l=%.2f)', omega, a0, g, l));
        xlabel(ax1, '时间 (s)');
        ylabel(ax1, '角度 θ (rad)');
        grid(ax1, 'on');
        
        % 相图
        plot(ax2, theta, dtheta, 'LineWidth', 1.5);
        title(ax2, sprintf('相图 (θ vs dθ/dt) - 初始角度: %.1f°', theta0_deg));
        xlabel(ax2, '角度 θ (rad)');
        ylabel(ax2, '角速度 dθ/dt (rad/s)');
        grid(ax2, 'on');
        
        % 设置颜色
        if is_unstable
            set(ax1.Children, 'Color', [0.8 0 0]);
            set(ax2.Children, 'Color', [0.8 0 0]);
        else
            set(ax1.Children, 'Color', [0 0.4 0.7]);
            set(ax2.Children, 'Color', [0 0.4 0.7]);
        end
    end

    % 摆的运动方程
    function dxdt = pendulum_ode(t, x, a, b, omega)
        theta = x(1);
        dtheta = x(2);
        
        % 运动方程: d²θ/dt² = [ (a₀ω² cos(ωt))/l - g/l ] sinθ
        dxdt = zeros(2,1);
        dxdt(1) = dtheta;  % dθ/dt = dtheta
        dxdt(2) = (b * cos(omega * t) - a) * sin(theta);
    end

    % Mathieu方程稳定性分析 (基于标准稳定性图)
    function unstable = mathieu_stability(a, b, omega)
        % 转换到标准Mathieu方程形式
        % 原始方程: d²θ/dt² + (a - b cos(ωt))θ = 0
        % 令 τ = ωt/2, 则方程变为:
        % d²θ/dτ² + [4a/ω² - (4b/ω²)cos(2τ)]θ = 0
        % 标准形式: d²y/dτ² + (p - 2q cos(2τ))y = 0
        p = 4 * a / (omega^2);
        q = 2 * b / (omega^2);
        
        % 计算特征值判断稳定性
        % 使用Mathieu方程的特征值近似计算方法
        % 稳定区域: p > q²/2 且 |p - n²| > q/2 (n为整数)
        % 不稳定区域: p接近整数平方(n²)且q足够大
        
        % 检查主要不稳定区域 (n=1)
        if abs(p - 1) < q/2 + 0.1
            unstable = true;
            return;
        end
        
        % 检查次要不稳定区域 (n=2)
        if abs(p - 4) < q/2 + 0.1 && q > 0.2
            unstable = true;
            return;
        end
        
        % 检查原点附近不稳定区域
        if p < q^2/2
            unstable = true;
            return;
        end
        
        % 其他情况视为稳定
        unstable = false;
    end
end
