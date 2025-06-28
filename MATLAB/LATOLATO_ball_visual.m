function dydt = lato_lato_ode(t, y, a0, omega, l, g)
    theta = y(1); dtheta = y(2);
    % Mathieu型方程 (Funata & Abidin Eq.11)
    ddtheta = -(g - a0*omega^2*cos(omega*t))/l * sin(theta);
    dydt = [dtheta; ddtheta];
end

% 参数设置
a0 = 0.1;   % 驱动振幅 [m]
omega = 8;  % 驱动频率 [rad/s] (接近2ω₀时共振)
l = 0.25;   % 绳长 [m]
g = 9.81;   % 重力加速度

% 初始条件 (相1: θ0=0.1, dθ0=0; 相2: θ0=π, dθ0=2√(g/l))
[t, y] = ode45(@(t,y) lato_lato_ode(t,y,a0,omega,l,g), [0 10], [0.1; 0]);

% 绘制时间序列
figure;
subplot(2,1,1);
plot(t, y(:,1)); 
xlabel('Time [s]'); ylabel('\theta [rad]'); 
title('Angular Displacement');

% 绘制相图 (θ vs dθ)
subplot(2,1,2);
plot(y(:,1), y(:,2));
xlabel('\theta [rad]'); ylabel('d\theta/dt [rad/s]');
title('Phase Portrait');
hold on;
% 标记势能壁垒 E=2mgl (对应dθ=2√(g/l*(1-cosθ)))
theta_range = linspace(-pi, pi, 100);
dtheta_critical = 2*sqrt(g/l*(1 - cos(theta_range)));
plot(theta_range, dtheta_critical, 'r--');
legend('Trajectory', 'E=2mgl barrier');

% 小球位置计算
x1 = l*sin(y(:,1)); y1 = -l*cos(y(:,1));
x2 = -x1; y2 = y1; % 对称运动

% 动画绘制
figure;
for k = 1:10:length(t)
    plot(0, 0, 'ko', 'MarkerSize', 10); % 支点
    hold on;
    plot([0, x1(k)], [0, y1(k)], 'b-'); % 绳子
    plot([0, x2(k)], [0, y2(k)], 'r-');
    plot(x1(k), y1(k), 'bo', 'MarkerSize', 15); % 球1
    plot(x2(k), y2(k), 'ro', 'MarkerSize', 15); % 球2
    hold off;
    axis equal; axis([-1.1*l 1.1*l -1.5*l 0.1*l]);
    title(sprintf('Time=%.2fs', t(k)));
    drawnow;
end

