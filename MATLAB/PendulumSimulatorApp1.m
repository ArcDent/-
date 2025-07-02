function PendulumSimulatorApp
    % 创建主窗口
    fig = uifigure('Name', 'Pendulum Simulator', 'Position', [100, 100, 1000, 700]);
    
    % 创建输入面板
    panel = uipanel(fig, 'Title', 'Parameters', 'Position', [20, 420, 300, 280]);
    
    % 添加输入控件
    uilabel(panel, 'Text', 'R:', 'Position', [20, 230, 100, 22]);
    editR = uieditfield(panel, 'numeric', 'Value', 0.5, 'Position', [120, 230, 100, 22]);
    
    uilabel(panel, 'Text', 'L:', 'Position', [20, 200, 100, 22]);
    editL = uieditfield(panel, 'numeric', 'Value', 1.0, 'Position', [120, 200, 100, 22]);
    
    uilabel(panel, 'Text', 'g:', 'Position', [20, 170, 100, 22]);
    editg = uieditfield(panel, 'numeric', 'Value', 9.8, 'Position', [120, 170, 100, 22]);
    
    uilabel(panel, 'Text', 'a₀:', 'Position', [20, 140, 100, 22]);
    edita0 = uieditfield(panel, 'numeric', 'Value', 1.0, 'Position', [120, 140, 100, 22]);
    
    uilabel(panel, 'Text', 'ω:', 'Position', [20, 110, 100, 22]);
    editomega = uieditfield(panel, 'numeric', 'Value', 2.0, 'Position', [120, 110, 100, 22]);
    
    uilabel(panel, 'Text', 'Initial Angle (θ):', 'Position', [20, 80, 100, 22]);
    editThetaInit = uieditfield(panel, 'numeric', 'Value', 0.8, 'Position', [120, 80, 100, 22]);
    editThetaInit.Limits = [0, pi/2]; % 设置角度范围
    
    uilabel(panel, 'Text', 'Simulation Time:', 'Position', [20, 50, 100, 22]);
    editTf = uieditfield(panel, 'numeric', 'Value', 10, 'Position', [120, 50, 100, 22]);
    
    % 添加模拟按钮
    btn = uibutton(fig, 'push', 'Text', 'Simulate', 'Position', [120, 380, 100, 30],...
        'ButtonPushedFcn', @(btn,event) runSimulation(fig, editR, editL, editg, edita0, editomega, editThetaInit, editTf));
    
    % 创建坐标轴
    ax1 = uiaxes(fig, 'Position', [350, 380, 600, 280], 'Box', 'on');
    title(ax1, '\theta vs Time');
    xlabel(ax1, 'Time (s)');
    ylabel(ax1, '\theta (rad)');
    grid(ax1, 'on');
    
    ax2 = uiaxes(fig, 'Position', [350, 50, 600, 280], 'Box', 'on');
    title(ax2, 'Phase Diagram');
    xlabel(ax2, '\theta (rad)');
    ylabel(ax2, 'd\theta/dt (rad/s)');
    grid(ax2, 'on');
    
    % 存储坐标轴句柄
    fig.UserData.ax1 = ax1;
    fig.UserData.ax2 = ax2;
end

function runSimulation(fig, editR, editL, editg, edita0, editomega, editThetaInit, editTf)
    % 获取参数值
    R = editR.Value;
    L = editL.Value;
    g = editg.Value;
    a0 = edita0.Value;
    omega = editomega.Value;
    theta_init = editThetaInit.Value; % 用户设置的初始角度
    Tf = editTf.Value;
    
    % 计算θ₀
    theta0 = asin(R/(R + L));
    
    % 验证初始角度是否在有效范围内
    if theta_init < theta0
        warndlg(sprintf('Initial angle must be ≥ θ₀ (%.4f rad). Using θ₀ instead.', theta0), 'Invalid Input');
        theta_init = theta0;
        editThetaInit.Value = theta_init; % 更新UI中的值
    elseif theta_init > pi/2
        warndlg(sprintf('Initial angle must be ≤ π/2 (%.4f rad). Using π/2 instead.', pi/2), 'Invalid Input');
        theta_init = pi/2;
        editThetaInit.Value = theta_init; % 更新UI中的值
    end
    
    % 计算微分方程系数
    denom = 5*R^2 + 3*L^2;
    A = 3*a0*omega^2 / denom;
    B = 3*g / denom;
    
    % 定义微分方程
    odefun = @(t, y) [y(2); 
                      (A*cos(omega*t) + B) * sin(y(1))];
    
    % 定义碰撞事件函数
    function [value, isterminal, direction] = events(t, y)
        value = y(1) - theta0;      % 当θ = θ₀时触发
        isterminal = 1;             % 停止积分
        direction = -1;             % 仅当θ减小时检测
    end
    
    % 设置ODE选项
    options = odeset('Events', @events, 'RelTol', 1e-6, 'AbsTol', 1e-9);
    
    % 初始条件（使用用户设置的初始角度）
    y0 = [theta_init; 0]; % 初始角速度设为0
    t_start = 0;
    t_end = Tf;
    
    % 存储所有结果
    allT = [];
    allY = [];
    
    % 主模拟循环
    while t_start < t_end
        % 积分直到发生事件或达到结束时间
        [t, y, te, ye, ie] = ode45(odefun, [t_start, t_end], y0, options);
        
        % 存储结果
        allT = [allT; t];
        allY = [allY; y];
        
        % 检查是否发生碰撞事件
        if ~isempty(te)
            % 应用碰撞条件
            pre_collision_velocity = ye(2);
            post_collision_velocity = -pre_collision_velocity * cos(2*theta0);
            
            % 设置碰撞后初始条件
            y0 = [theta0; post_collision_velocity];
            t_start = te;
        else
            break;
        end
    end
    
    % 提取结果
    theta = allY(:, 1);
    theta_dot = allY(:, 2);
    
    % 筛选θ在[θ₀, π/2]之间的数据
    validIdx = (theta >= theta0) & (theta <= pi/2);
    validT = allT(validIdx);
    validTheta = theta(validIdx);
    validThetaDot = theta_dot(validIdx);
    
    % 获取坐标轴
    ax1 = fig.UserData.ax1;
    ax2 = fig.UserData.ax2;
    
    % 绘制θ-t图
    cla(ax1);
    plot(ax1, validT, validTheta, 'b', 'LineWidth', 1.5);
    title(ax1, '\theta vs Time');
    xlabel(ax1, 'Time (s)');
    ylabel(ax1, '\theta (rad)');
    grid(ax1, 'on');
    ylim(ax1, [theta0, pi/2]);
    
    % 绘制相图
    cla(ax2);
    plot(ax2, validTheta, validThetaDot, 'r', 'LineWidth', 1.5);
    title(ax2, 'Phase Diagram');
    xlabel(ax2, '\theta (rad)');
    ylabel(ax2, 'd\theta/dt (rad/s)');
    grid(ax2, 'on');
    xlim(ax2, [theta0, pi/2]);
    
    % 添加参考线和初始点
    hold(ax1, 'on');
    plot(ax1, [min(validT), max(validT)], [theta0, theta0], 'k--', 'LineWidth', 1);
    plot(ax1, [min(validT), max(validT)], [pi/2, pi/2], 'k--', 'LineWidth', 1);
    plot(ax1, 0, theta_init, 'ro', 'MarkerSize', 8, 'MarkerFaceColor', 'r'); % 标记初始点
    hold(ax1, 'off');
    
    hold(ax2, 'on');
    plot(ax2, [theta0, theta0], [min(validThetaDot), max(validThetaDot)], 'k--', 'LineWidth', 1);
    plot(ax2, [pi/2, pi/2], [min(validThetaDot), max(validThetaDot)], 'k--', 'LineWidth', 1);
    plot(ax2, theta_init, 0, 'ro', 'MarkerSize', 8, 'MarkerFaceColor', 'r'); % 标记初始点
    hold(ax2, 'off');
    
    % 添加图例
    legend(ax1, {'\theta(t)', 'Bounds', '', 'Start point'}, 'Location', 'best');
    legend(ax2, {'Phase plot', 'Bounds', '', 'Start point'}, 'Location', 'best');
end
