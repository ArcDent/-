function PendulumSimulatorAppq
    % 创建主窗口
    fig = figure('Name', 'Pendulum Simulator', 'NumberTitle', 'off', ...
                 'Position', [100, 100, 1200, 700], 'Color', [0.95, 0.95, 0.95]);
    movegui(fig, 'center');
    
    % 添加输入面板
    inputPanel = uipanel('Title', 'Simulation Parameters', 'FontWeight', 'bold', ...
                         'Position', [0.02, 0.6, 0.25, 0.35]);
    
    % 参数默认值
    defaults = {1, 1, 9.8, 1, 0.05, 1, 0.5}; % R, L, g, a0, ω_n, init_angle_n, tmax
    params = {'R', 'L', 'g', 'a_0', 'omega (π rad/s)', 'initial angle (π rad)', 'Max Time (s)'};
    
    % 创建参数输入控件
    positions = linspace(0.85, 0.05, numel(params));
    for i = 1:numel(params)
        uicontrol('Parent', inputPanel, 'Style', 'text', 'String', params{i}, ...
                  'Units', 'normalized', 'Position', [0.05, positions(i)-0.05, 0.6, 0.07], ...
                  'HorizontalAlignment', 'left', 'BackgroundColor', [0.95, 0.95, 0.95]);
        
        editControls(i) = uicontrol('Parent', inputPanel, 'Style', 'edit', ...
                                    'String', num2str(defaults{i}), ...
                                    'Units', 'normalized', ...
                                    'Position', [0.65, positions(i)-0.05, 0.3, 0.07]);
    end
    
    % 临界角计算和显示
    updateCriticalAngle([], [], editControls(1), editControls(2), true);
    
    % 添加触发临界角更新的回调
    set(editControls(1), 'Callback', {@updateCriticalAngle, editControls(1), editControls(2), false});
    set(editControls(2), 'Callback', {@updateCriticalAngle, editControls(1), editControls(2), false});
    
    % 添加计算按钮
    calcBtn = uicontrol('Style', 'pushbutton', 'String', 'Simulate', ...
                        'Units', 'normalized', 'Position', [0.1, 0.54, 0.1, 0.05], ...
                        'Callback', {@runSimulation, editControls}, ...
                        'FontWeight', 'bold', 'BackgroundColor', [0.3, 0.8, 0.3]);
    
    % 状态信息显示
    infoText = uicontrol('Style', 'text', 'String', '', ...
                         'Units', 'normalized', 'Position', [0.02, 0.48, 0.25, 0.05], ...
                         'HorizontalAlignment', 'left', ...
                         'BackgroundColor', [0.95, 0.95, 0.95]);
                     
    % 创建绘图区
    axisTheta = subplot(2,1,1, 'Position', [0.3, 0.55, 0.65, 0.4]);
    axisPhase = subplot(2,1,2, 'Position', [0.3, 0.08, 0.65, 0.4]);
    
    % 临界角更新函数
    function updateCriticalAngle(~, ~, editR, editL, init)
        try
            R = str2double(get(editR, 'String'));
            L = str2double(get(editL, 'String'));
            theta_c = asin(R/(R+L));
            set(infoText, 'String', ...
                sprintf('Critical angle θ_c = %.5f rad ≈ %.3fπ', theta_c, theta_c/pi));
        catch
            if ~init
                set(infoText, 'String', 'Error calculating θ_c');
            end
        end
    end

    % 主仿真函数
    function runSimulation(~, ~, editControls)
        try
            % 获取参数值
            R = str2double(get(editControls(1), 'String'));
            L = str2double(get(editControls(2), 'String'));
            g = str2double(get(editControls(3), 'String'));
            a0 = str2double(get(editControls(4), 'String'));
            omega_n = str2double(get(editControls(5), 'String'));
            init_angle_n = str2double(get(editControls(6), 'String'));
            tmax = str2double(get(editControls(7), 'String'));
            
            % 转换倍率参数
            omega = omega_n * pi;           % ω = omega_n * π
            theta0 = init_angle_n * pi;     % 初始角度(弧度)
            
            % 计算临界角θ_c
            theta_c = asin(R/(R+L));
            theta_limit = pi/2;  % 上限角
            
            % 验证初始角度
            if theta0 <= theta_c
                error('Initial angle must be > θ_c = %.5f', theta_c);
            elseif theta0 >= theta_limit
                error('Initial angle must be < π/2 ≈ %.5f', pi/2);
            end
            
            % 方程系数
            denominator = 5*R^2 + 3*L^2 + 6*L*R;
            A = (3*a0*omega^2) / denominator;
            B = 3*g / denominator;
            
            % 微分方程函数
            odefun = @(t, y) [y(2); 
                              - (A * cos(omega*t) + B) * sin(y(1))];
            
            % 事件函数（碰撞检测和终止条件）
            function [value, isterminal, direction] = events(t, y)
                value = [y(1) - theta_c;     % 到达临界角（碰撞）
                        y(1) - theta_limit]; % 超出π/2
                isterminal = [1; 1];        % 两个事件都应终止积分
                direction = [-1; 1];        % 碰撞检测下降方向，终止检测上升方向
            end
            
            % 初始化仿真参数
            tspan = [0 tmax];
            y0 = [theta0; 0]; % [角度; 角速度]
            
            % 仿真结果存储
            t_total = [];
            y_total = [];
            collision_points = [];
            
            while tspan(1) < tspan(2)
                options = odeset('Events', @events);
                [t, y, te, ye, ie] = ode45(odefun, tspan, y0, options);
                
                % 累积结果
                t_total = [t_total; t];
                y_total = [y_total; y];
                
                % 记录碰撞点
                if ~isempty(ie) && ie(1) == 1
                    collision_points = [collision_points; te(1), ye(1,1), ye(1,2)];
                end
                
                % 检测事件类型
                if isempty(ie)
                    break; % 没有事件，到达时间上限
                end
                
                if ie(end) == 2 % 超出π/2
                    break;
                end
                
                if ie(1) == 1 % 发生碰撞
                    % 碰撞后速度反向并衰减
                    new_theta_dot = -ye(1,2) * cos(2*theta_c);
                    y0 = [theta_c; new_theta_dot];
                    tspan(1) = te(1);
                else
                    break;
                end
            end
            
            % 绘图：θ-t图
            axes(axisTheta);
            plot(t_total, y_total(:,1), 'b', 'LineWidth', 1.5);
            hold on;
            
            % 绘制碰撞点（红圈标记）
            if ~isempty(collision_points)
                plot(collision_points(:,1), collision_points(:,2), 'ro', ...
                     'Marker 8, 'MarkerFaceColor', [1, 0.2, 0.2]);
            end
            
            % 绘制参考线
            yline(theta_c, '--r', 'LineWidth', 2, 'DisplayName', ...
                  sprintf('θ_c = %.5f', theta_c));
            yline(pi/2, '--g', 'LineWidth', 2, 'DisplayName', 'π/2');
            
            hold off;
            title('Pendulum Angle vs. Time');
            xlabel('Time (s)');
            ylabel('θ (rad)');
            legend('θ(t)', 'Collision', 'θ_c', 'π/2', 'Location', 'best');
            grid on;
            ylim([min(theta_c, min(y_total(:,1))-0.1), min(pi/2+0.1, max(y_total(:,1))+0.1)]);
            
            % 绘图：相图（角速度-角度）
            axes(axisPhase);
            plot(y_total(:,1), y_total(:,2), 'b', 'LineWidth', 1.5);
            hold on;
            
            % 标注碰撞点
            if ~isempty(collision_points)
                scatter(collision_points(:,2), collision_points(:,3), 80, ...
                        'r', 'o', 'filled', 'MarkerEdgeColor', 'k');
            end
            
            % 绘制参考线
            xline(theta_c, '--r', 'LineWidth', 2);
            xline(pi/2, '--g', 'LineWidth', 2);
            
            % 标注参考线值
            text(theta_c+0.02, min(ylim)+0.1*range(ylim), ...
                 sprintf('θ_c = %.5f', theta_c), 'Color', 'r', 'FontSize', 10);
            text(pi/2+0.02, min(ylim)+0.1*range(ylim), ...
                 'π/2 = 1.57080', 'Color', 'g', 'FontSize', 10);
            
            hold off;
            title('Phase Diagram (dθ/dt vs. θ)');
            xlabel('θ (rad)');
            ylabel('dθ/dt (rad/s)');
            grid on;
            set(gca, 'XLim', [min(theta_c, min(y_total(:,1))-0.1), min(pi/2+0.1, max(y_total(:,1)))+0.1]);
            
        catch ME
            errordlg(ME.message, 'Simulation Error');
        end
    end
end
