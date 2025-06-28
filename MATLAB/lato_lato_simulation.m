function lato_lato_simulation()
    % 参数设置
    g = 9.81;       % 重力加速度 (m/s^2)
    l = 0.25;       % 摆长 (m)
    a0 = 0.5;       % 驱动振幅 (m)
    omega = 10;     % 驱动角频率 (rad/s)
    m = 0.02;       % 质量 (kg)
    
    % 初始条件 [theta, theta_dot]
    initial_conditions = [1.5, 0];  % 初始角度 (rad), 初始角速度 (rad/s)
    
    % 时间范围 (0到3秒)
    tspan = [0, 3];
    
    % 使用ode45求解微分方程，带事件检测
    options = odeset('Events', @collision_events);
    [t, y, te, ye, ie] = ode45(@(t, y) pendulum_ode(t, y, g, l, a0, omega), tspan, initial_conditions, options);
    
    % 绘制角度随时间变化
    figure;
    plot(t, y(:, 1), 'b-', 'LineWidth', 1.5);
    xlabel('时间 (s)');
    ylabel('角度 \theta (rad)');
    title('Lato-Lato 角度 vs 时间');
    grid on;
    
    % 显示碰撞事件
    hold on;
    plot(te, ye(:, 1), 'ro', 'MarkerSize', 8);
    legend('运动轨迹', '碰撞事件');
end

% 定义微分方程 (Mathieu方程)
function dydt = pendulum_ode(t, y, g, l, a0, omega)
    theta = y(1);
    theta_dot = y(2);
    
    % 方程11: \ddot{\theta} = -(g - a0*omega^2*cos(omega*t))/l * sin(theta)
    theta_ddot = -(g - a0*omega^2*cos(omega*t)) * sin(theta) / l;
    
    dydt = [theta_dot; theta_ddot];
end

% 定义碰撞事件检测 (在theta=0或theta=pi时触发)
function [value, isterminal, direction] = collision_events(t, y)
    theta = y(1);
    
    % 检测是否接近theta=0或theta=pi (阈值设为0.01)
    value = [theta - 0; theta - pi];
    isterminal = [1; 1];   % 事件触发时停止积分
    direction = [0; 0];    % 检测所有方向的穿越
end

% 碰撞处理函数 (在事件触发后调用)
function [y_new, terminate] = handle_collision(t, y, ie)
    theta = y(1);
    theta_dot = y(2);
    
    % 根据事件类型 (ie=1: theta=0; ie=2: theta=pi) 反向角速度
    if ie == 1 || ie == 2
        theta_dot_new = -theta_dot;  % 方程36和37
    else
        theta_dot_new = theta_dot;
    end
    
    y_new = [theta; theta_dot_new];
    terminate = 0;  % 继续积分
end