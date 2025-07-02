function nonlinear_pendulum_simulator
    % 创建主窗口
    fig = figure('Name', '非线性摆模拟', 'NumberTitle', 'off', ...
                 'Position', [100, 100, 1200, 600], 'Color', [0.94, 0.94, 0.94]);
    
    % 创建参数输入面板
    paramPanel = uipanel(fig, 'Title', '参数设置', 'Position', [0.01, 0.01, 0.28, 0.98]);
    
    % 参数输入控件
    uicontrol(paramPanel, 'Style', 'text', 'String', '半径 R:', ...
              'Units', 'normalized', 'Position', [0.05, 0.90, 0.4, 0.05]);
    R_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '0.1', ...
                      'Units', 'normalized', 'Position', [0.5, 0.90, 0.4, 0.05]);
    
    uicontrol(paramPanel, 'Style', 'text', 'String', '长度 L:', ...
              'Units', 'normalized', 'Position', [0.05, 0.82, 0.4, 0.05]);
    L_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '0.5', ...
                      'Units', 'normalized', 'Position', [0.5, 0.82, 0.4, 0.05]);
    
    uicontrol(paramPanel, 'Style', 'text', 'String', '重力加速度 g:', ...
              'Units', 'normalized', 'Position', [0.05, 0.74, 0.4, 0.05]);
    g_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '9.81', ...
                      'Units', 'normalized', 'Position', [0.5, 0.74, 0.4, 0.05]);
    
    uicontrol(paramPanel, 'Style', 'text', 'String', '振幅 a0:', ...
              'Units', 'normalized', 'Position', [0.05, 0.66, 0.4, 0.05]);
    a0_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '0.5', ...
                       'Units', 'normalized', 'Position', [0.5, 0.66, 0.4, 0.05]);
    
    uicontrol(paramPanel, 'Style', 'text', 'String', '频率 ω:', ...
              'Units', 'normalized', 'Position', [0.05, 0.58, 0.4, 0.05]);
    omega_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '5', ...
                          'Units', 'normalized', 'Position', [0.5, 0.58, 0.4, 0.05]);
    
    uicontrol(paramPanel, 'Style', 'text', 'String', '初始角度 θ_init (rad):', ...
              'Units', 'normalized', 'Position', [0.05, 0.50, 0.4, 0.05]);
    theta_init_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '1.0', ...
                               'Units', 'normalized', 'Position', [0.5, 0.50, 0.4, 0.05]);
    
    uicontrol(paramPanel, 'Style', 'text', 'String', '初始角速度 dθ/dt0:', ...
              'Units', 'normalized', 'Position', [0.05, 0.42, 0.4, 0.05]);
    dtheta0_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '0', ...
                            'Units', 'normalized', 'Position', [0.5, 0.42, 0.4, 0.05]);
    
    uicontrol(paramPanel, 'Style', 'text', 'String', '模拟时间 Tmax:', ...
              'Units', 'normalized', 'Position', [0.05, 0.34, 0.4, 0.05]);
    Tmax_edit = uicontrol(paramPanel, 'Style', 'edit', 'String', '10', ...
                         'Units', 'normalized', 'Position', [0.5, 0.34, 0.4, 0.05]);
    
    % 模拟按钮
    simButton = uicontrol(paramPanel, 'Style', 'pushbutton', 'String', '开始模拟', ...
                         'Units', 'normalized', 'Position', [0.3, 0.2, 0.4, 0.08], ...
                         'Callback', @runSimulation, 'FontWeight', 'bold', ...
                         'BackgroundColor', [0.3, 0.75, 0.93]);
    
    % 创建绘图区域
    ax1 = axes(fig, 'Position', [0.32, 0.55, 0.65, 0.4]); % 角度-时间图
    title(ax1, '角度-时间图');
    xlabel(ax1, '时间 t (s)');
    ylabel(ax1, '角度 \theta (rad)');
    grid(ax1, 'on');
    hold(ax1, 'on');
    
    ax2 = axes(fig, 'Position', [0.32, 0.05, 0.65, 0.4]); % 相图
    title(ax2, '相图');
    xlabel(ax2, '角度 \theta (rad)');
    ylabel(ax2, '角速度 d\theta/dt (rad/s)');
    grid(ax2, 'on');
    hold(ax2, 'on');
    
    % 存储图形对象句柄
    handles.ax1 = ax1;
    handles.ax2 = ax2;
    guidata(fig, handles);
    
    % 主模拟函数
    function runSimulation(~, ~)
        % 获取参数值
        R = str2double(get(R_edit, 'String'));
        L = str2double(get(L_edit, 'String'));
        g = str2double(get(g_edit, 'String'));
        a0 = str2double(get(a0_edit, 'String'));
        omega_val = str2double(get(omega_edit, 'String'));
        theta_init = str2double(get(theta_init_edit, 'String'));
        dtheta_dt0 = str2double(get(dtheta0_edit, 'String'));
        Tmax = str2double(get(Tmax_edit, 'String'));
        
        % 计算临界角度 θ0
        theta0 = asin(R/(R+L));
        
        % 验证初始角度
        if theta_init <= theta0 || theta_init >= pi/2
            errordlg(['初始角度必须在 ', num2str(theta0), ' 和 π (', num2str(pi/2), ') 之间'], '输入错误');
            return;
        end
        
        % 设置ODE选项（包含事件检测）
        options = odeset('Events', @(t,y) events(t,y,theta0), 'RelTol', 1e-6);
        
        % 初始化变量
        t_start = 0;
        y0 = [theta_init; dtheta_dt0];
        t_all = [];
        y_all = [];
        
        % 循环模拟直到达到最大时间或角度越界
        while t_start < Tmax
            [t, y, te, ye, ie] = ode45(@(t,y) odefunc(t, y, R, L, g, a0, omega_val), ...
                                       [t_start, Tmax], y0, options);
            
            % 存储结果
            t_all = [t_all; t];
            y_all = [y_all; y];
            
            % 检查事件
            if ~isempty(ie)
                if ie(end) == 1 % 碰撞事件
                    % 计算碰撞后速度
                    v_before = ye(end, 2);
                    v_after = -v_before * cos(2*theta0);
                    
                    % 设置新的初始条件
                    y0 = [theta0; v_after];
                    t_start = te(end);
                else % 超出角度范围
                    break;
                end
            else
                break;
            end
        end
        
        % 过滤结果（只保留θ在θ0和π/2之间的数据）
        valid_idx = (y_all(:,1) >= theta0) & (y_all(:,1) <= pi/2);
        t_filtered = t_all(valid_idx);
        y_filtered = y_all(valid_idx,:);
        
        % 获取图形句柄
        handles = guidata(fig);
        ax1 = handles.ax1;
        ax2 = handles.ax2;
        
        % 更新角度-时间图
        cla(ax1);
        plot(ax1, t_filtered, y_filtered(:,1), 'b', 'LineWidth', 1.5);
        hold(ax1, 'on');
        yline(ax1, theta0, 'r--', 'LineWidth', 1.5, 'DisplayName', ['
