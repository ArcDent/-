function pendulum_simulation
    % 创建主窗口
    fig = uifigure('Name', '摆锤运动模拟', 'Position', [100 100 1200 700]);
    
    % 参数输入面板
    paramPanel = uipanel(fig, 'Title', '输入参数', 'Position', [20, 400, 300, 280]);
    
    % 参数输入控件
    uilabel(paramPanel, 'Text', 'R (摆杆端点半径):', 'Position', [10, 250, 150, 22]);
    R_edit = uieditfield(paramPanel, 'numeric', 'Value', 1, 'Position', [160, 250, 80, 22]);
    
    uilabel(paramPanel, 'Text', 'L (摆杆长度):', 'Position', [10, 220, 150, 22]);
    L_edit = uieditfield(paramPanel, 'numeric', 'Value', 2, 'Position', [160, 220, 80, 22]);
    
    uilabel(paramPanel, 'Text', 'g (重力加速度):', 'Position', [10, 190, 150, 22]);
    g_edit = uieditfield(paramPanel, 'numeric', 'Value', 9.8, 'Position', [160, 190, 80, 22]);
    
    uilabel(paramPanel, 'Text', 'a_0:', 'Position', [10, 160, 150, 22]);
    a0_edit = uieditfield(paramPanel, 'numeric', 'Value', 1, 'Position', [160, 160, 80, 22]);
    
    uilabel(paramPanel, 'Text', 'ω (nπ) [n的值]:', 'Position', [10, 130, 150, 22]);
    w_edit = uieditfield(paramPanel, 'numeric', 'Value', 2, 'Position', [160, 130, 80, 22]);
    
    uilabel(paramPanel, 'Text', '初始角度 (mπ) [m]:', 'Position', [10, 100, 150, 22]);
    theta_i_edit = uieditfield(paramPanel, 'numeric', 'Value', 0.25, 'Position', [160, 100, 80, 22]);
    
    uilabel(paramPanel, 'Text', '最大时间 (s):', 'Position', [10, 70, 150, 22]);
    Tmax_edit = uieditfield(paramPanel, 'numeric', 'Value', 20, 'Position', [160, 70, 80, 22]);
    
    % 状态文本显示
    status_text = uilabel(fig, 'Text', '', 'Position', [20, 330, 280, 40], 'WordWrap', 'on');
    
    % 模拟按钮
    sim_btn = uibutton(fig, 'push', 'Text', '开始模拟', ...
        'Position', [100, 350, 200, 30], ...
        'ButtonPushedFcn', @run_simulation);
    
    % 图例开关
    legend_toggle = uicheckbox(fig, 'Text', '显示图例', 'Value', true, ...
        'Position', [50, 320, 100, 22]);
    
    % 创建坐标区域
    ax1 = uiaxes(fig, 'Position', [350, 380, 800, 280], ...
        'XLim', [0 20], 'YLim', [0 90], ...
        'XLabel', '时间 (s)', 'YLabel', '角度 (°)', ...
        'Title', '角度随时间变化');
    
    ax2 = uiaxes(fig, 'Position', [350, 50, 800, 280], ...
        'XLim', [0 90], 'YLim', [-2 2], ...
        'XLabel', '角度 (°)', 'YLabel', '角速度 (rad/s)', ...
        'Title', '相图');
    
    % 主模拟函数
    function run_simulation(~, ~)
        % 更新状态
        status_text.Text = '正在计算模拟...';
        drawnow;
        
        try
            % 获取参数
            R = R_edit.Value;
            L = L_edit.Value;
            g = g_edit.Value;
            a0 = a0_edit.Value;
            w_factor = w_edit.Value;   % 倍数的值n
            w = w_factor * pi;         % ω = nπ
            m = theta_i_edit.Value;    % 初始角度倍数
            theta_initial = m * pi;    % θ0 = m*π
            Tmax = Tmax_edit.Value;
            
            % 计算θ0
            theta0_val = asin(R/(R+L)); % 理论碰撞角度
            
            % 验证初始角度是否有效
            if theta_initial <= theta0_val || theta_initial >= pi/2
                status_text.Text = sprintf(['初始角度必须在θ0和π/2之间！\n' ...
                    'θ0 = %.4f rad (%.2f°)\n' ...
                    'π/2 = %.4f rad (90°)'], ...
                    theta0_val, rad2deg(theta0_val), pi/2);
                return;
            end
            
            % 计算系数分母 (5R^2 + 3L^2 + 6LR)
            denom = 5*R^2 + 3*L^2 + 6*L*R;
            if denom == 0
                status_text.Text = '分母不能为零! 请调整R和L的值';
                return;
            end
            
            % 计算系数A和B
            A = (3*a0*w^2) / denom;
            B = 3*g / denom;
            
            % 准备积分参数
            y0 = [theta_initial; 0];  % 初始状态[角度；角速度]
            t_span = [0 Tmax];        % 时间跨度
            options = odeset('AbsTol',1e-8,'RelTol',1e-8);  % 提高精度
            ref_theta0 = theta0_val;
            ref_pi2 = pi/2;
            
            % 核心循环：使用事件检测停止积分
            t_all = []; theta_all = []; dtheta_all = [];
            while t_span(1) < t_span(2)
                % 定义事件函数（确保列向量输出）
                options.Events = @(t,y) event_function(t,y,ref_theta0,ref_pi2);
                
                % 使用ode45求解
                try
                    [t,y,te,ye,ie] = ode45(@(t,y) odefcn(t,y,A,B,w), t_span, y0, options);
                catch ME
                    status_text.Text = ['ODE求解错误: ' ME.message];
                    return;
                end
                
                % 收集结果
                t_all = [t_all; t];
                theta_all = [theta_all; y(:,1)];
                dtheta_all = [dtheta_all; y(:,2)];
                
                % 处理事件
                if ~isempty(ie)
                    % 取第一个检测到的事件
                    ie_type = ie(1);
                    
                    if ie_type == 1  % 碰撞事件
                        % 计算新速度（使用反弹公式）
                        new_velocity = -ye(1,2)*cos(2*ref_theta0);
                        y0 = [ref_theta0; new_velocity];
                        t_span(1) = te(1);
                        
                        % 确保角速度不会发散
                        if abs(new_velocity) > 10
                            status_text.Text = '警告：角速度过大，可能不稳定的模拟';
                            break;
                        end
                    else  % ie_type==2，超过pi/2终止
                        break;
                    end
                else
                    break;
                end
            end
            
            % 绘制结果
            plot_results(ax1, ax2, t_all, theta_all, dtheta_all, ...
                ref_theta0, ref_pi2, legend_toggle.Value);
            
            % 更新状态
            status_text.Text = sprintf('模拟完成! \n运行时间: %.2f秒，数据点数: %d', ...
                t_all(end), length(t_all));
            
        catch ME
            status_text.Text = sprintf('错误: %s\n发生在: %s (行 %d)', ...
                ME.message, ME.stack(1).name, ME.stack(1).line);
        end
    end

    % 修正的事件函数（确保列向量输出）
    function [value, isterminal, direction] = event_function(t, y, theta0, pi2)
        % 事件1: 碰撞事件（θ下降到θ0）
        value1 = y(1) - theta0;   % θ - θ0 = 0
        isterminal1 = 1;          % 停止积分
        direction1 = -1;          % 仅负方向触发
        
        % 事件2: 超过π/2
        value2 = pi2 - y(1);      % π/2 - θ = 0
        isterminal2 = 1;          % 停止积分
        direction2 = -1;          % 仅负方向触发（θ增加时）
        
        % 组合为列向量
        value = [value1; value2];
        isterminal = [isterminal1; isterminal2];
        direction = [direction1; direction2];
    end

    % 定义微分方程
    function dydt = odefcn(t, y, A, B, w)
        theta = y(1);
        % 模型方程: θ'' = -[A cos(ωt) + B] sin(θ)
        dydt = [y(2); 
                - (A*cos(w*t) + B) * sin(theta)];
    end

    % 优化后的结果绘制
    function plot_results(ax1, ax2, t, theta, dtheta, theta0, pi2, show_legend)
        % 清除之前的图形
        cla(ax1); cla(ax2);
        
        % 角度变换为度
        theta_deg = rad2deg(theta);
        ref_theta0_deg = rad2deg(theta0);
        ref_pi2_deg = 90; % π/2
        
        % 计算坐标轴限制
        min_theta = min(theta_deg);
        max_theta = max(theta_deg);
        y1_lim = [max(min_theta*0.9, ref_theta0_deg*0.9) min(max_theta*1.1, 95)];
        min_dtheta = min(dtheta);
        max_dtheta = max(dtheta);
        y2_lim = [min(min_dtheta, -0.1) max(max_dtheta, 0.1)];
        if diff(y2_lim) < 0.2
            y2_lim = mean(y2_lim) + [-0.2 0.2];
        end
        
        % θ-t图
        plot(ax1, t, theta_deg, 'b-', 'LineWidth', 1.5, 'DisplayName', 'θ(t)');
        hold(ax1, 'on');
        
        % 参考线（θ₀和π/2）
        h1 = line(ax1, [0 t(end)], [ref_theta0_deg ref_theta0_deg], ...
            'Color', 'r', 'LineStyle', '--', 'LineWidth', 1.5, ...
            'DisplayName', sprintf('θ₀ = %.2f°', ref_theta0_deg));
        
        h2 = line(ax1, [0 t(end)], [ref_pi2_deg ref_pi2_deg], ...
            'Color', 'm', 'LineStyle', '--', 'LineWidth', 1.5, ...
            'DisplayName', 'π/2 = 90°');
        
        hold(ax1, 'off');
        
        title(ax1, '角度随时间变化');
        xlabel(ax1, '时间 (s)');
        ylabel(ax1, '角度 (°)');
        grid(ax1, 'on');
        set(ax1, 'YLim', y1_lim);
        
        % 相图
        plot(ax2, theta_deg, dtheta, 'b-', 'LineWidth', 1.5, 'DisplayName', '相轨迹');
        hold(ax2, 'on');
        
        % 参考线（θ₀和π/2）
        line(ax2, [ref_theta0_deg ref_theta0_deg], get(ax2, 'YLim'), ...
            'Color', 'r', 'LineStyle', '--', 'LineWidth', 1.5, ...
            'DisplayName', sprintf('θ₀ = %.2f°', ref_theta0_deg));
        
        line(ax2, [ref_pi2_deg ref_pi2_deg], get(ax2, 'YLim'), ...
            'Color', 'm', 'LineStyle', '--', 'LineWidth', 1.5, ...
            'DisplayName', 'π/2 = 90°');
        
        % 标记起始点
        plot(ax2, theta_deg(1), dtheta(1), 'go', 'MarkerSize', 8, ...
            'LineWidth', 2, 'DisplayName', '起始点');
        
        hold(ax2, 'off');
        
        title(ax2, sprintf('相图 (角度 vs. 角速度)\n能量系数: A = %.2f, B = %.2f', A, B));
        xlabel(ax2, '角度 (°)');
        ylabel(ax2, '角速度 (rad/s)');
        grid(ax2, 'on');
        set(ax2, 'XLim', [max(ref_theta0_deg-5, min_theta-5) min(95, max_theta+5)]);
        set(ax2, 'YLim', y2_lim);
        
        % 显示图例
        if show_legend
            legend(ax1, 'show', 'Location', 'best');
            legend(ax2, 'show', 'Location', 'best');
        end
        
        % 突出显示碰撞点
        for i = 2:length(theta)
            if abs(theta(i)-theta0) < 1e-3 && theta(i) < theta(i-1)
                plot(ax1, t(i), theta_deg(i), 'ro', 'MarkerSize', 6);
                plot(ax2, theta_deg(i), dtheta(i), 'ro', 'MarkerSize', 6);
            end
        end
    end

    % 辅助函数：弧度到角度转换
    function degrees = rad2deg(radians)
        degrees = radians * 180 / pi;
    end
end
