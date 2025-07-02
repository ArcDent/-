function PendulumCollisionSimulator1
    % 创建主窗口
    fig = figure('Name', 'Pendulum Collision Simulator', 'NumberTitle', 'off', ...
                 'Position', [100, 100, 1300, 700], 'Color', [0.95, 0.95, 0.95]);
    
    % 创建网格布局
    gl = uigridlayout(fig, [1, 2]);
    gl.ColumnWidth = {'3x', '1x'}; % 图形区域占3/4，控制面板占1/4
    
    % 创建图形区域
    axPanel = uipanel(gl, 'Title', 'Simulation Results');
    axLayout = uigridlayout(axPanel, [2, 1]);
    axLayout.RowHeight = {'1x', '1x'};
    
    ax1 = uiaxes(axLayout);
    title(ax1, '\theta vs Time');
    xlabel(ax1, 'Time (s)');
    ylabel(ax1, '\theta (rad)');
    grid(ax1, 'on');
    hold(ax1, 'on');
    
    ax2 = uiaxes(axLayout);
    title(ax2, 'Phase Diagram');
    xlabel(ax2, '\theta (rad)');
    ylabel(ax2, 'd\theta/dt (rad/s)');
    grid(ax2, 'on');
    hold(ax2, 'on');
    
    % 创建控制面板
    controlPanel = uipanel(gl, 'Title', 'Simulation Parameters', ...
                          'BackgroundColor', [0.9, 0.92, 0.95]);
    controlLayout = uigridlayout(controlPanel, [18, 3]);
    controlLayout.RowHeight = repmat({25}, 1, 18);
    controlLayout.ColumnWidth = {'1x', '2x', '1x'};
    controlLayout.Padding = [10, 10, 10, 10];
    
    % 添加参数控件 - 物理参数组
    uilabel(controlLayout, 'Text', 'Physical Parameters', 'FontWeight', 'bold', ...
            'HorizontalAlignment', 'center', 'BackgroundColor', [0.7, 0.8, 0.9]);
    uilabel(controlLayout, 'Text', '');
    uilabel(controlLayout, 'Text', '');
    
    addParameterControl(controlLayout, 'R (m):', '0.1', 3, [0.01, 1], @validatePositive);
    addParameterControl(controlLayout, 'L (m):', '0.5', 4, [0.01, 2], @validatePositive);
    addParameterControl(controlLayout, 'g (m/s²):', '9.8', 5, [1, 20], @validatePositive);
    addParameterControl(controlLayout, 'a₀ (m):', '0.1', 6, [0, 5], @validateNonNegative);
    addParameterControl(controlLayout, 'ω (rad/s):', '10', 7, [0.1, 50], @validatePositive);
    
    % 分隔线
    uilabel(controlLayout, 'Text', '', 'BackgroundColor', [0.7, 0.7, 0.7]);
    uilabel(controlLayout, 'Text', '', 'BackgroundColor', [0.7, 0.7, 0.7]);
    uilabel(controlLayout, 'Text', '', 'BackgroundColor', [0.7, 0.7, 0.7]);
    
    % 添加参数控件 - 初始条件组
    uilabel(controlLayout, 'Text', 'Initial Conditions', 'FontWeight', 'bold', ...
            'HorizontalAlignment', 'center', 'BackgroundColor', [0.7, 0.8, 0.9]);
    uilabel(controlLayout, 'Text', '');
    uilabel(controlLayout, 'Text', '');
    
    addParameterControl(controlLayout, 'Initial θ (rad):', '1.0', 10, [0.1, 1.5], @validateInitialAngle);
    addParameterControl(controlLayout, 'Initial dθ/dt:', '0', 11, [-5, 5], @validateNumber);
    addParameterControl(controlLayout, 'Sim Time (s):', '10', 12, [1, 100], @validatePositive);
    
    % 分隔线
    uilabel(controlLayout, 'Text', '', 'BackgroundColor', [0.7, 0.7, 0.7]);
    uilabel(controlLayout, 'Text', '', 'BackgroundColor', [0.7, 0.7, 0.7]);
    uilabel(controlLayout, 'Text', '', 'BackgroundColor', [0.7, 0.7, 0.7]);
    
    % 添加参数控件 - 计算值
    uilabel(controlLayout, 'Text', 'Calculated Values', 'FontWeight', 'bold', ...
            'HorizontalAlignment', 'center', 'BackgroundColor', [0.7, 0.8, 0.9]);
    uilabel(controlLayout, 'Text', '');
    uilabel(controlLayout, 'Text', '');
    
    uilabel(controlLayout, 'Text', 'θ₀ (rad):');
    theta0_label = uilabel(controlLayout, 'Text', '0.0', 'FontColor', [0.8, 0.2, 0.2]);
    uilabel(controlLayout, 'Text', '');
    
    uilabel(controlLayout, 'Text', 'Range:');
    range_label = uilabel(controlLayout, 'Text', '[0.0, 1.57]', 'FontColor', [0.2, 0.5, 0.2]);
    uilabel(controlLayout, 'Text', '');
    
    % 添加按钮
    simulate_btn = uibutton(controlLayout, 'push', 'Text', 'Run Simulation', ...
                           'BackgroundColor', [0.3, 0.7, 0.3], 'FontWeight', 'bold');
    simulate_btn.Layout.Row = 16;
    simulate_btn.Layout.Column = [1, 3];
    
    reset_btn = uibutton(controlLayout, 'push', 'Text', 'Reset to Defaults', ...
                         'BackgroundColor', [0.8, 0.8, 0.8]);
    reset_btn.Layout.Row = 17;
    reset_btn.Layout.Column = [1, 3];
    
    % 存储应用数据
    appdata.ax1 = ax1;
    appdata.ax2 = ax2;
    appdata.theta0_label = theta0_label;
    appdata.range_label = range_label;
    appdata.params = struct();
    appdata.controls = struct();
    
    % 获取所有控件句柄
    tags = {'R', 'L', 'g', 'a0', 'omega', 'theta_init', 'dtheta_init', 't_final'};
    for i = 1:length(tags)
        appdata.controls.(tags{i}) = findobj(controlLayout, 'Tag', tags{i});
    end
    
    % 设置回调函数
    simulate_btn.ButtonPushedFcn = @(btn,event) simulateCallback(appdata);
    reset_btn.ButtonPushedFcn = @(btn,event) resetCallback(appdata);
    
    % 为所有控件添加值改变回调
    all_edits = findobj(controlLayout, '-regexp', 'Tag', '.*');
    for i = 1:length(all_edits)
        if isprop(all_edits(i), 'ValueChangedFcn')
            all_edits(i).ValueChangedFcn = @(src,event) updateCalculations(appdata);
        end
    end
    
    % 初始化计算值
    updateCalculations(appdata);
    guidata(fig, appdata);
    
    % 重置为默认值
    resetCallback(appdata);
end

function addParameterControl(parent, labelText, defaultValue, row, range, validationFcn)
    % 创建标签
    lbl = uilabel(parent, 'Text', labelText, 'HorizontalAlignment', 'right');
    lbl.Layout.Row = row;
    lbl.Layout.Column = 1;
    
    % 创建编辑框和滑动条
    if range(2) > range(1) % 如果有有效范围，添加滑动条
        slider = uislider(parent, 'Limits', range, 'MajorTicks', [], 'MinorTicks', []);
        slider.Layout.Row = row;
        slider.Layout.Column = 2;
        
        edit = uieditfield(parent, 'numeric', 'Value', str2double(defaultValue), ...
                          'Limits', range, 'RoundFractionalValues', 'off');
        edit.Layout.Row = row;
        edit.Layout.Column = 3;
        
        % 设置标签用于查找
        tag = lower(regexprep(labelText, '[^a-zA-Z0-9]', ''));
        slider.Tag = [tag '_slider'];
        edit.Tag = tag;
        
        % 链接编辑框和滑动条
        linkprop([slider, edit], 'Value');
        
        % 设置验证函数
        edit.ValueChangedFcn = @(src,event) validationFcn(src.Value, src);
    else
        edit = uieditfield(parent, 'numeric', 'Value', str2double(defaultValue));
        edit.Layout.Row = row;
        edit.Layout.Column = [2, 3];
        edit.Tag = lower(regexprep(labelText, '[^a-zA-Z0-9]', ''));
    end
end

function updateCalculations(appdata)
    % 获取参数值
    params = getParams(appdata);
    
    % 计算θ₀
    theta0 = asin(params.R / (params.R + params.L));
    
    % 更新计算值显示
    appdata.theta0_label.Text = sprintf('%.4f', theta0);
    appdata.range_label.Text = sprintf('[%.4f, %.4f]', theta0, pi/2);
    
    % 更新初始角度范围
    if isfield(appdata.controls, 'theta_init_slider')
        minVal = theta0 + 0.001;
        maxVal = pi/2 - 0.001;
        appdata.controls.theta_init_slider.Limits = [minVal, maxVal];
        appdata.controls.theta_init.Limits = [minVal, maxVal];
        
        % 确保初始角度在范围内
        if appdata.controls.theta_init.Value < minVal
            appdata.controls.theta_init.Value = minVal + 0.01;
        elseif appdata.controls.theta_init.Value > maxVal
            appdata.controls.theta_init.Value = maxVal - 0.01;
        end
    end
    
    % 高亮显示临界值
    if theta0 > pi/3
        appdata.theta0_label.FontColor = [0.8, 0.1, 0.1];
    else
        appdata.theta0_label.FontColor = [0.2, 0.2, 0.8];
    end
end

function params = getParams(appdata)
    params.R = appdata.controls.r.Value;
    params.L = appdata.controls.l.Value;
    params.g = appdata.controls.g.Value;
    params.a0 = appdata.controls.a0.Value;
    params.omega = appdata.controls.omega.Value;
    params.theta_init = appdata.controls.theta_init.Value;
    params.dtheta_init = appdata.controls.dtheta_init.Value;
    params.t_final = appdata.controls.t_final.Value;
end

function resetCallback(appdata)
    % 重置为默认值
    defaults = struct(...
        'R', 0.1, ...
        'L', 0.5, ...
        'g', 9.8, ...
        'a0', 0.1, ...
        'omega', 10, ...
        'theta_init', 1.0, ...
        'dtheta_init', 0, ...
        't_final', 10 ...
    );
    
    fields = fieldnames(defaults);
    for i = 1:length(fields)
        if isfield(appdata.controls, fields{i})
            appdata.controls.(fields{i}).Value = defaults.(fields{i});
        end
    end
    
    % 更新计算值
    updateCalculations(appdata);
end

function simulateCallback(appdata)
    % 获取参数
    params = getParams(appdata);
    
    % 计算θ₀
    theta0 = asin(params.R / (params.R + params.L));
    
    % 验证初始角度
    if params.theta_init <= theta0 || params.theta_init >= pi/2
        uialert(appdata.ax1.Parent.Parent, ...
                sprintf('Initial θ must be between %.4f and %.4f!', theta0, pi/2), ...
                'Input Error');
        return;
    end
    
    % 清除旧图形
    cla(appdata.ax1);
    cla(appdata.ax2);
    
    % 添加参考线
    plot(appdata.ax1, [0, params.t_final], [theta0, theta0], ...
        'r--', 'LineWidth', 1.8, 'DisplayName', '\theta_0');
    plot(appdata.ax1, [0, params.t_final], [pi/2, pi/2], ...
        'g--', 'LineWidth', 1.8, 'DisplayName', '\pi/2');
    
    plot(appdata.ax2, [theta0, theta0], [-100, 100], ...
        'r--', 'LineWidth', 1.8, 'DisplayName', '\theta_0');
    plot(appdata.ax2, [pi/2, pi/2], [-100, 100], ...
        'g--', 'LineWidth', 1.8, 'DisplayName', '\pi/2');
    
    % 设置坐标轴范围
    ylim(appdata.ax1, [theta0 - 0.1, pi/2 + 0.1]);
    xlim(appdata.ax2, [theta0 - 0.1, pi/2 + 0.1]);
    ylim(appdata.ax2, 'auto');
    
    % 添加图例
    legend(appdata.ax1, 'Location', 'best');
    legend(appdata.ax2, 'Location', 'best');
    
    % 微分方程参数
    ode_params.R = params.R;
    ode_params.L = params.L;
    ode_params.g = params.g;
    ode_params.a0 = params.a0;
    ode_params.omega = params.omega;
    ode_params.theta0 = theta0;
    
    % 初始条件
    y0 = [params.theta_init; params.dtheta_init];
    t_span = [0, params.t_final];
    
    % 初始化存储数组
    all_t = [];
    all_y = [];
    
    % 创建进度条
    progress = uiprogressdlg(appdata.ax1.Parent.Parent, ...
        'Title', 'Simulating', 'Message', 'Solving ODE...', 'Indeterminate', 'on');
    
    % 模拟循环（处理多次碰撞）
    t_start = 0;
    options = odeset('Events', @(t,y) events(t, y, ode_params), 'RelTol', 1e-6);
    try
        while t_start < params.t_final
            % 求解ODE直到事件或结束时间
            [t_ode, y_ode, te, ~, ~] = ode45(@(t,y) odefunc(t, y, ode_params), ...
                                             [t_start, params.t_final], y0, options);
            
            % 存储结果
            all_t = [all_t; t_ode];
            all_y = [all_y; y_ode];
            
            % 如果没有事件发生，退出循环
            if isempty(te)
                break;
            end
            
            % 处理碰撞：更新速度
            v_before = y_ode(end, 2);
            v_after = -v_before * cos(2 * ode_params.theta0);
            y0 = [ode_params.theta0; v_after];
            t_start = t_ode(end);
            
            % 在相图中添加碰撞点
            plot(appdata.ax2, [ode_params.theta0, ode_params.theta0], ...
                [v_before, v_after], 'k-', 'LineWidth', 1.2);
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
        plot(appdata.ax1, t_valid, theta_valid, ...
            'b-', 'LineWidth', 1.8, 'DisplayName', 'Solution');
        
        plot(appdata.ax2, theta_valid, dtheta_valid, ...
            'b-', 'LineWidth', 1.2, 'DisplayName', 'Trajectory');
        
        % 添加标题
        title(appdata.ax1, sprintf('\\theta vs Time (\\theta_0 = %.4f)', theta0));
        title(appdata.ax2, sprintf('Phase Diagram (Collisions: %d)', length(te)));
        
        % 添加网格
        grid(appdata.ax1, 'on');
        grid(appdata.ax2, 'on');
        
    catch ME
        uialert(appdata.ax1.Parent.Parent, ...
                sprintf('Simulation error:\n%s', ME.message), 'Error');
    end
    
    % 关闭进度条
    close(progress);
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

% 事件函数
function [value, isterminal, direction] = events(~, y, p)
    theta = y(1);
    dtheta = y(2);
    
    % 事件1: θ下降到θ₀
    value(1) = theta - p.theta0;
    isterminal(1) = 1;
    direction(1) = -1;  % 负方向穿越
    
    % 事件2: θ上升到π/2
    value(2) = theta - pi/2;
    isterminal(2) = 1;
    direction(2) = 1;   % 正方向穿越
end

% 验证函数
function valid = validatePositive(value, src)
    valid = true;
    if value <= 0
        valid = false;
        src.Value = 0.1;
        error('Value must be positive');
    end
end

function valid = validateNonNegative(value, src)
    valid = true;
    if value < 0
        valid = false;
        src.Value = 0;
        error('Value must be non-negative');
    end
end

function valid = validateNumber(value, ~)
    valid = true;
    if isnan(value)
        valid = false;
        error('Value must be a number');
    end
end

function valid = validateInitialAngle(value, src)
    valid = true;
    fig = ancestor(src, 'figure');
    appdata = guidata(fig);
    
    % 获取θ₀
    R = appdata.controls.r.Value;
    L = appdata.controls.l.Value;
    theta0 = asin(R / (R + L));
    
    if value <= theta0 || value >= pi/2
        valid = false;
        newVal = (theta0 + pi/2)/2;
        src.Value = newVal;
        error('Initial θ must be between %.4f and %.4f', theta0, pi/2);
    end
end