classdef PendulumSimulator < matlab.apps.AppBase
    % Properties corresponding to app components
    properties (Access = public)
        UIFigure             matlab.ui.Figure
        GridLayout          matlab.ui.container.GridLayout
        LeftPanel           matlab.ui.container.Panel
        REditField          matlab.ui.control.NumericEditField
        LEditField          matlab.ui.control.NumericEditField
        gEditField          matlab.ui.control.NumericEditField
        a0EditField         matlab.ui.control.NumericEditField
        omegaEditField      matlab.ui.control.NumericEditField
        theta0EditField     matlab.ui.control.NumericEditField
        SimulateButton      matlab.ui.control.Button
        RightPanel          matlab.ui.container.Panel
        UIAxesTime          matlab.ui.control.UIAxes
        UIAxesPhase         matlab.ui.control.UIAxes
    end
    
    methods (Access = private)
        % Function to simulate pendulum motion
        function results = simulatePendulum(app)
            % Get parameters from UI
            R = app.REditField.Value;
            L = app.LEditField.Value;
            g = app.gEditField.Value;
            a0 = app.a0EditField.Value;
            omega = app.omegaEditField.Value;
            theta0_deg = app.theta0EditField.Value;
            
            % Calculate derived parameters
            theta_critical = asin(R/(R + L)); % Critical angle
            theta0 = deg2rad(theta0_deg);     % Initial angle in radians
            A = (3*a0*omega^2) / (5*R^2 + 3*L^2);
            B = 3*g / (5*R^2 + 3*L^2);
            k = cos(2*theta_critical);        % Collision coefficient
            
            % Validate initial conditions
            if theta0 <= theta_critical || theta0 >= pi/2
                error('Initial angle must be between %.2f° and 90°', rad2deg(theta_critical));
            end
            
            % Set up simulation parameters
            tmax = 10;       % Max simulation time
            dt = 0.001;      % Time step
            t = 0:dt:tmax;   % Time vector
            nt = numel(t);
            
            % Initialize state variables
            theta = zeros(1, nt);
            dtheta = zeros(1, nt);
            theta(1) = theta0;
            dtheta(1) = 0;
            
            % Main simulation loop
            for i = 1:nt-1
                % Calculate acceleration
                ddtheta = -(A*cos(omega*t(i)) + B) * sin(theta(i));
                
                % Update velocity and position using Euler method
                dtheta(i+1) = dtheta(i) + ddtheta*dt;
                theta(i+1) = theta(i) + dtheta(i+1)*dt;
                
                % Check for collision
                if theta(i+1) < theta_critical && dtheta(i+1) < 0
                    % Apply collision dynamics
                    dtheta(i+1) = -dtheta(i+1) * k;
                    theta(i+1) = theta_critical;
                end
                
                % Enforce angle boundaries
                if theta(i+1) > pi/2
                    theta(i+1) = pi/2;
                    dtheta(i+1) = 0;
                elseif theta(i+1) < theta_critical
                    theta(i+1) = theta_critical;
                end
            end
            
            % Store results
            results.t = t;
            results.theta = theta;
            results.dtheta = dtheta;
            results.theta_critical = theta_critical;
        end
        
        % Button pushed function: SimulateButton
        function SimulateButtonPushed(app, ~)
            try
                % Run simulation
                results = simulatePendulum(app);
                
                % Plot theta vs time
                plot(app.UIAxesTime, results.t, results.theta, 'b-', 'LineWidth', 1.5);
                hold(app.UIAxesTime, 'on');
                
                % Add reference lines
                yline(app.UIAxesTime, results.theta_critical, 'r--', 'LineWidth', 1.5, ...
                    'Label', sprintf('θ_c = %.2f°', rad2deg(results.theta_critical)));
                yline(app.UIAxesTime, pi/2, 'g--', 'LineWidth', 1.5, 'Label', 'π/2');
                
                % Format time plot
                hold(app.UIAxesTime, 'off');
                title(app.UIAxesTime, 'Pendulum Angle vs Time');
                xlabel(app.UIAxesTime, 'Time (s)');
                ylabel(app.UIAxesTime, 'θ (rad)');
                legend(app.UIAxesTime, 'Angle', 'Location', 'northeast');
                grid(app.UIAxesTime, 'on');
                
                % Plot phase diagram
                plot(app.UIAxesPhase, results.theta, results.dtheta, 'b-', 'LineWidth', 1.5);
                hold(app.UIAxesPhase, 'on');
                
                % Add reference lines
                xline(app.UIAxesPhase, results.theta_critical, 'r--', 'LineWidth', 1.5, ...
                    'Label', sprintf('θ_c = %.2f°', rad2deg(results.theta_critical)));
                xline(app.UIAxesPhase, pi/2, 'g--', 'LineWidth', 1.5, 'Label', 'π/2');
                
                % Format phase plot
                hold(app.UIAxesPhase, 'off');
                title(app.UIAxesPhase, 'Phase Diagram');
                xlabel(app.UIAxesPhase, 'θ (rad)');
                ylabel(app.UIAxesPhase, 'dθ/dt (rad/s)');
                legend(app.UIAxesPhase, 'Phase Trajectory', 'Location', 'northeast');
                grid(app.UIAxesPhase, 'on');
                
            catch ME
                errordlg(ME.message, 'Simulation Error');
            end
        end
    end

    % App initialization and construction
    methods (Access = private)
        % Create UIFigure and components
        function createComponents(app)
            % Create UIFigure
            app.UIFigure = uifigure('Visible', 'off');
            app.UIFigure.Position = [100 100 1200 600];
            app.UIFigure.Name = 'Pendulum Motion Simulator';
            app.UIFigure.Color = [0.96 0.96 0.98];
            
            % Create GridLayout
            app.GridLayout = uigridlayout(app.UIFigure);
            app.GridLayout.ColumnWidth = {'1x', '2x'};
            app.GridLayout.RowHeight = {'1x'};
            app.GridLayout.BackgroundColor = [0.94 0.94 0.96];
            
            % Create LeftPanel
            app.LeftPanel = uipanel(app.GridLayout);
            app.LeftPanel.Layout.Row = 1;
            app.LeftPanel.Layout.Column = 1;
            app.LeftPanel.BackgroundColor = [0.98 0.98 1];
            app.LeftPanel.BorderType = 'none';
            
            % Create RightPanel
            app.RightPanel = uipanel(app.GridLayout);
            app.RightPanel.Layout.Row = 1;
            app.RightPanel.Layout.Column = 2;
            app.RightPanel.BorderType = 'none';
            
            % Create input fields
            createInputField(app, 'R (m):', 0.2, 0.1, 0.5, [30 450 120 22], [160 450 100 22]);
            createInputField(app, 'L (m):', 0.5, 0.1, 2.0, [30 400 120 22], [160 400 100 22]);
            createInputField(app, 'g (m/s²):', 9.8, 1, 20, [30 350 120 22], [160 350 100 22]);
            createInputField(app, 'a₀ (m/s²):', 1.0, 0.1, 10, [30 300 120 22], [160 300 100 22]);
            createInputField(app, 'ω (rad/s):', 2*pi, 0.1, 20, [30 250 120 22], [160 250 100 22]);
            createInputField(app, 'θ₀ (deg):', 45, rad2deg(asin(0.2/(0.2+0.5))+1, 89, [30 200 120 22], [160 200 100 22]));
            
            % Create SimulateButton
            app.SimulateButton = uibutton(app.LeftPanel, 'push');
            app.SimulateButton.ButtonPushedFcn = createCallbackFcn(app, @SimulateButtonPushed, true);
            app.SimulateButton.Position = [80 100 120 40];
            app.SimulateButton.Text = 'Simulate';
            app.SimulateButton.FontSize = 14;
            app.SimulateButton.FontWeight = 'bold';
            app.SimulateButton.BackgroundColor = [0.3 0.6 1];
            app.SimulateButton.FontColor = [1 1 1];
            
            % Create axes for plots
            app.UIAxesTime = uiaxes(app.RightPanel);
            app.UIAxesTime.Position = [50 320 500 230];
            
            app.UIAxesPhase = uiaxes(app.RightPanel);
            app.UIAxesPhase.Position = [50 50 500 230];
            
            % Show the figure after all components are created
            app.UIFigure.Visible = 'on';
        end
        
        function createInputField(app, label, value, min, max, labelPos, fieldPos)
            uilabel(app.LeftPanel, 'Text', label, 'Position', labelPos, ...
                'FontSize', 12, 'FontWeight', 'bold');
            
            switch label
                case 'R (m):'
                    app.REditField = uieditfield(app.LeftPanel, 'numeric', ...
                        'Value', value, 'Limits', [min max], 'Position', fieldPos);
                case 'L (m):'
                    app.LEditField = uieditfield(app.LeftPanel, 'numeric', ...
                        'Value', value, 'Limits', [min max], 'Position', fieldPos);
                case 'g (m/s²):'
                    app.gEditField = uieditfield(app.LeftPanel, 'numeric', ...
                        'Value', value, 'Limits', [min max], 'Position', fieldPos);
                case 'a₀ (m/s²):'
                    app.a0EditField = uieditfield(app.LeftPanel, 'numeric', ...
                        'Value', value, 'Limits', [min max], 'Position', fieldPos);
                case 'ω (rad/s):'
                    app.omegaEditField = uieditfield(app.LeftPanel, 'numeric', ...
                        'Value', value, 'Limits', [min max], 'Position', fieldPos);
                case 'θ₀ (deg):'
                    app.theta0EditField = uieditfield(app.LeftPanel, 'numeric', ...
                        'Value', value, 'Limits', [min max], 'Position', fieldPos);
            end
        end
    end

    methods (Access = public)
        % Construct app
        function app = PendulumSimulator
            % Create and configure components
            createComponents(app)
            
            % Register the app with App Designer
            registerApp(app, app.UIFigure)
            
            if nargout == 0
                clear app
            end
        end
    end
end