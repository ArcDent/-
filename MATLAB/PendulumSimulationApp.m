classdef PendulumSimulationApp < matlab.apps.AppBase

    % Properties that correspond to app components
    properties (Access = public)
        UIFigure            matlab.ui.Figure
        RLabel              matlab.ui.control.Label
        RSlider             matlab.ui.control.Slider
        LLabel              matlab.ui.control.Label
        LSlider             matlab.ui.control.Slider
        gLabel              matlab.ui.control.Label
        gSlider             matlab.ui.control.Slider
        a0Label             matlab.ui.control.Label
        a0Slider            matlab.ui.control.Slider
        omegaLabel          matlab.ui.control.Label
        omegaSlider         matlab.ui.control.Slider
        InitialAngleLabel   matlab.ui.control.Label
        InitialAngleSlider  matlab.ui.control.Slider
        SimulateButton      matlab.ui.control.Button
        ThetaTPlot          matlab.ui.control.UIAxes
        PhasePlot           matlab.ui.control.UIAxes
    end

    % Callbacks that handle component events
    methods (Access = private)

        % Button pushed function: SimulateButton
        function simulateButtonPushed(app, event)
            % Get parameters from sliders
            R = app.RSlider.Value;
            L = app.LSlider.Value;
            g = app.gSlider.Value;
            a0 = app.a0Slider.Value;
            omega = app.omegaSlider.Value;
            initialAngle = app.InitialAngleSlider.Value;

            % Calculate theta_0
            theta0 = asin(R / (R + L));

            % Time span for simulation
            tspan = [0 10]; % Adjust as needed

            % Initial conditions
            y0 = [initialAngle; 0]; % [theta, theta_dot]

            % Define the differential equation
            odefun = @(t, y) pendulumODE(t, y, R, L, g, a0, omega);

            % Solve the differential equation
            [t, y] = ode45(odefun, tspan, y0);

            % Filter results to keep theta between theta_0 and pi/2
            validIdx = y(:, 1) >= theta0 & y(:, 1) <= pi/2;
            t = t(validIdx);
            y = y(validIdx, :);

            % Plot theta-t
            plot(app.ThetaTPlot, t, y(:, 1));
            hold(app.ThetaTPlot, 'on');
            yline(app.ThetaTPlot, theta0, 'r--', 'LineWidth', 1.5);
            yline(app.ThetaTPlot, pi/2, 'b--', 'LineWidth', 1.5);
            title(app.ThetaTPlot, '\theta - t');
            xlabel(app.ThetaTPlot, 'Time');
            ylabel(app.ThetaTPlot, '\theta');
            hold(app.ThetaTPlot, 'off');

            % Plot phase plot
            plot(app.PhasePlot, y(:, 1), y(:, 2));
            hold(app.PhasePlot, 'on');
            xline(app.PhasePlot, theta0, 'r--', 'LineWidth', 1.5);
            xline(app.PhasePlot, pi/2, 'b--', 'LineWidth', 1.5);
            title(app.PhasePlot, 'Phase Plot');
            xlabel(app.PhasePlot, '\theta');
            ylabel(app.PhasePlot, '\theta_dot');
            hold(app.PhasePlot, 'off');
        end

        % Differential equation function
        function dydt = pendulumODE(t, y, R, L, g, a0, omega)
            theta = y(1);
            theta_dot = y(2);
            theta_ddot = ((3 * a0 * omega^2) / (5 * R^2 + 3 * L^2) * cos(omega * t) + 3 * g / (5 * R^2 + 3 * L^2)) * sin(theta) - theta_dot;
            dydt = [theta_dot; theta_ddot];
        end
    end

    % Component initialization
    methods (Access = private)

        % Create UIFigure and components
        function createComponents(app)

            % Create UIFigure and hide until all components are created
            app.UIFigure = uifigure('Visible', 'off');
            app.UIFigure.Position = [100 100 640 480];
            app.UIFigure.Name = 'Pendulum Simulation';

            % Create RLabel
            app.RLabel = uilabel(app.UIFigure, 'Position', [20 400 100 22], 'Text', 'R');

            % Create RSlider
            app.RSlider = uislider(app.UIFigure, 'Position', [130 400 200 3], 'Limits', [0.1 10], 'Value', 1);

            % Create LLabel
            app.LLabel = uilabel(app.UIFigure, 'Position', [20 370 100 22], 'Text', 'L');

            % Create LSlider
            app.LSlider = uislider(app.UIFigure, 'Position', [130 370 200 3], 'Limits', [0.1 10], 'Value', 1);

            % Create gLabel
            app.gLabel = uilabel(app.UIFigure, 'Position', [20 340 100 22], 'Text', 'g');

            % Create gSlider
            app.gSlider = uislider(app.UIFigure, 'Position', [130 340 200 3], 'Limits', [1 20], 'Value', 9.81);

            % Create a0Label
            app.a0Label = uilabel(app.UIFigure, 'Position', [20 310 100 22], 'Text', 'a0');

            % Create a0Slider
            app.a0Slider = uislider(app.UIFigure, 'Position', [130 310 200 3], 'Limits', [0.1 10], 'Value', 1);

            % Create omegaLabel
            app.omegaLabel = uilabel(app.UIFigure, 'Position', [20 280 100 22], 'Text', 'omega');

            % Create omegaSlider
            app.omegaSlider = uislider(app.UIFigure, 'Position', [130 280 200 3], 'Limits', [0.1 10], 'Value', 1);

            % Create InitialAngleLabel
            app.InitialAngleLabel = uilabel(app.UIFigure, 'Position', [20 250 100 22], 'Text', 'Initial Angle');

            % Create InitialAngleSlider
            app.InitialAngleSlider = uislider(app.UIFigure, 'Position', [130 250 200 3], 'Limits', [0.1 pi/2], 'Value', pi/4);

            % Create SimulateButton
            app.SimulateButton = uibutton(app.UIFigure, 'push', 'Position', [130 200 100 22], 'Text', 'Simulate');
            app.SimulateButton.ButtonPushedFcn = createCallbackFcn(app, @simulateButtonPushed, true);

            % Create ThetaTPlot
            app.ThetaTPlot = uiaxes(app.UIFigure, 'Position', [350 200 280 220]);

            % Create PhasePlot
            app.PhasePlot = uiaxes(app.UIFigure, 'Position', [350 20 280 160]);

            % Show the figure after all components are created
            app.UIFigure.Visible = 'on';
        end
    end

    % App initialization and construction
    methods (Access = public)

        % Construct app
        function app = PendulumSimulationApp

            % Create and configure components
            createComponents(app)

            % Register the app with App Designer
            registerApp(app, app.UIFigure)

            if nargout == 0
                clear app
            end
        end

        % Code that executes before app deletion
        function delete(app)

            % Delete UIFigure when app is deleted
            delete(app.UIFigure)
        end
    end
end