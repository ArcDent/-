function mathieu_equation_advanced()
    % Create figure and UI controls
    fig = figure('Name', 'Mathieu Equation Visualization', 'NumberTitle', 'off', ...
                 'Position', [100, 100, 900, 600]);
    
    % Default parameters
    default_omega = 2;
    default_A = 1;
    default_g = 9.81;
    default_l = 1;
    default_tmax = 20;
    
    % UI controls for parameters
    uicontrol('Style', 'text', 'Position', [20, 550, 100, 20], ...
              'String', 'ω (driving freq):');
    omega_slider = uicontrol('Style', 'slider', 'Position', [120, 550, 200, 20], ...
                            'Min', 0.1, 'Max', 5, 'Value', default_omega, ...
                            'Callback', @update_plot);
    omega_text = uicontrol('Style', 'edit', 'Position', [330, 550, 50, 20], ...
                          'String', num2str(default_omega), ...
                          'Callback', @omega_text_callback);
    
    uicontrol('Style', 'text', 'Position', [20, 520, 100, 20], ...
              'String', 'A (amplitude):');
    A_slider = uicontrol('Style', 'slider', 'Position', [120, 520, 200, 20], ...
                        'Min', 0, 'Max', 2, 'Value', default_A, ...
                        'Callback', @update_plot);
    A_text = uicontrol('Style', 'edit', 'Position', [330, 520, 50, 20], ...
                      'String', num2str(default_A), ...
                      'Callback', @A_text_callback);
    
    uicontrol('Style', 'text', 'Position', [20, 490, 100, 20], ...
              'String', 'g (gravity):');
    g_slider = uicontrol('Style', 'slider', 'Position', [120, 490, 200, 20], ...
                        'Min', 1, 'Max', 20, 'Value', default_g, ...
                        'Callback', @update_plot);
    g_text = uicontrol('Style', 'edit', 'Position', [330, 490, 50, 20], ...
                      'String', num2str(default_g), ...
                      'Callback', @g_text_callback);
    
    uicontrol('Style', 'text', 'Position', [20, 460, 100, 20], ...
              'String', 'l (length):');
    l_slider = uicontrol('Style', 'slider', 'Position', [120, 460, 200, 20], ...
                        'Min', 0.1, 'Max', 3, 'Value', default_l, ...
                        'Callback', @update_plot);
    l_text = uicontrol('Style', 'edit', 'Position', [330, 460, 50, 20], ...
                      'String', num2str(default_l), ...
                      'Callback', @l_text_callback);
    
    uicontrol('Style', 'text', 'Position', [20, 430, 100, 20], ...
              'String', 'Time max:');
    tmax_slider = uicontrol('Style', 'slider', 'Position', [120, 430, 200, 20], ...
                          'Min', 5, 'Max', 50, 'Value', default_tmax, ...
                          'Callback', @update_plot);
    tmax_text = uicontrol('Style', 'edit', 'Position', [330, 430, 50, 20], ...
                         'String', num2str(default_tmax), ...
                         'Callback', @tmax_text_callback);
    
    % Radio buttons for solution type
    solution_group = uibuttongroup('Position', [0.45, 0.85, 0.2, 0.1], ...
                                  'Title', 'Solution Type', ...
                                  'SelectionChangedFcn', @solution_type_callback);
    stable_radio = uicontrol(solution_group, 'Style', 'radiobutton', ...
                           'Position', [10, 30, 100, 20], 'String', 'Stable', ...
                           'Tag', 'stable');
    unstable_radio = uicontrol(solution_group, 'Position', [10, 5, 100, 20], ...
                             'Style', 'radiobutton', 'String', 'Unstable', ...
                             'Tag', 'unstable');
    
    % Initial selection
    set(solution_group, 'SelectedObject', stable_radio);
    show_stable = true;
    
    % Create axes for plotting
    ax = axes('Position', [0.1, 0.1, 0.8, 0.7]);
    
    % Initial plot
    update_plot();
    
    % Callback functions
    function omega_text_callback(src, ~)
        val = str2double(get(src, 'String'));
        if ~isnan(val) && val >= get(omega_slider, 'Min') && val <= get(omega_slider, 'Max')
            set(omega_slider, 'Value', val);
            update_plot();
        else
            set(src, 'String', num2str(get(omega_slider, 'Value')));
        end
    end
    
    function A_text_callback(src, ~)
        val = str2double(get(src, 'String'));
        if ~isnan(val) && val >= get(A_slider, 'Min') && val <= get(A_slider, 'Max')
            set(A_slider, 'Value', val);
            update_plot();
        else
            set(src, 'String', num2str(get(A_slider, 'Value')));
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
    
    function solution_type_callback(~, event)
        show_stable = strcmp(get(event.NewValue, 'Tag'), 'stable');
        update_plot();
    end
    
    function update_plot(~, ~)
        % Get current parameter values
        omega = get(omega_slider, 'Value');
        A = get(A_slider, 'Value');
        g = get(g_slider, 'Value');
        l = get(l_slider, 'Value');
        tmax = get(tmax_slider, 'Value');
        
        % Update text boxes
        set(omega_text, 'String', num2str(omega));
        set(A_text, 'String', num2str(A));
        set(g_text, 'String', num2str(g));
        set(l_text, 'String', num2str(l));
        set(tmax_text, 'String', num2str(tmax));
        
        % Calculate Mathieu equation parameters
        a = g / l;
        b = A * omega^2 / l;
        
        % Time vector
        t = linspace(0, tmax, 2000);
        
        % Initial conditions
        x0 = [1; 0];  % initial displacement and velocity
        
        % Solve the Mathieu equation
        [t, x] = ode45(@(t,x) mathieu_ode(t, x, a, b, omega), t, x0);
        
        % Determine stability
        is_unstable = is_solution_unstable(a, b);
        
        % Plot
        cla(ax);
        hold(ax, 'on');
        
        if show_stable && ~is_unstable
            plot(ax, t, x(:,1), 'b', 'LineWidth', 2);
            title(ax, sprintf('Stable Solution: \\omega=%.2f, A=%.2f, g=%.2f, l=%.2f', omega, A, g, l));
        elseif ~show_stable && is_unstable
            plot(ax, t, x(:,1), 'r', 'LineWidth', 2);
            title(ax, sprintf('Unstable Solution: \\omega=%.2f, A=%.2f, g=%.2f, l=%.2f', omega, A, g, l));
        else
            if show_stable
                title(ax, sprintf('Solution is actually UNSTABLE for these parameters! \\omega=%.2f, A=%.2f, g=%.2f, l=%.2f', omega, A, g, l));
            else
                title(ax, sprintf('Solution is actually STABLE for these parameters! \\omega=%.2f, A=%.2f, g=%.2f, l=%.2f', omega, A, g, l));
            end
        end
        
        xlabel(ax, 'Time');
        ylabel(ax, 'Displacement');
        grid(ax, 'on');
        hold(ax, 'off');
    end

    % Mathieu equation ODE function
    function dxdt = mathieu_ode(t, x, a, b, omega)
        dxdt = zeros(2,1);
        dxdt(1) = x(2);  % x' = v
        dxdt(2) = -(a + b*cos(omega*t)) * x(1);  % v' = -(a + b*cos(ωt))x
    end

    % Simple stability check (approximate)
    function unstable = is_solution_unstable(a, b)
        % This is a simplified stability check for demonstration
        % A more accurate method would involve Floquet analysis
        if b == 0
            unstable = (a < 0);
        else
            % Approximate instability regions
            n = 0:3;
            a_lower = n.^2 - b^2./(2*(4*n.^2-1)) - b^2*(7*n.^2+1)./(32*(4*n.^2-1).^3);
            a_upper = n.^2 + b^2./(2*(4*n.^2-1)) - b^2*(7*n.^2+1)./(32*(4*n.^2-1).^3);
            
            unstable = false;
            for k = 1:length(n)
                if a > a_lower(k) && a < a_upper(k)
                    unstable = true;
                    break;
                end
            end
        end
    end
end