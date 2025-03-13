function draw_custom_grid(varargin)
    % 绘制自定义坐标系（使用示例：draw_custom_grid('XPosUnit','V','XNegUnit','mV')）
        p = inputParser;
        
        % 添加默认参数
        addParameter(p, 'ShowNegX', true);%控制是否显示负轴（true显示/false隐藏）
        addParameter(p, 'ShowNegY', false);%控制是否显示负轴（true显示/false隐藏）
        addParameter(p, 'XPosDelta', 1);%设置x正轴刻度间隔
        addParameter(p, 'XNegDelta', 1);%设置x负轴刻度间隔
        addParameter(p, 'YPosDelta', 1);%设置y正轴刻度间隔
        addParameter(p, 'YNegDelta', 1);%设置y负轴刻度间隔
        addParameter(p, 'XPosScale', 1);%设置x正轴刻度值的缩放比例
        addParameter(p, 'XNegScale', 1);%设置x负轴刻度值的缩放比例
        addParameter(p, 'YPosScale', 1);%设置y正轴刻度值的缩放比例
        addParameter(p, 'YNegScale', 1);%设置y负轴刻度值的缩放比例
        addParameter(p, 'XPosUnit', '');%设置x正轴单位符号（支持LaTeX格式）
        addParameter(p, 'XNegUnit', '');%设置x负轴单位符号（支持LaTeX格式）
        addParameter(p, 'YPosUnit', '');%设置y正轴单位符号（支持LaTeX格式）
        addParameter(p, 'YNegUnit', '');%设置y负轴单位符号（支持LaTeX格式）
        addParameter(p, 'XPosMax', 5);%设置x正轴显示范围
        addParameter(p, 'XNegMax', -5);%设置x负轴显示范围
        addParameter(p, 'YPosMax', 5);%设置y正轴显示范围
        addParameter(p, 'YNegMax', -5);%设置y负轴显示范围
        
        parse(p, varargin{:});
        params = p.Results;
        
        % 处理坐标轴显示范围
        if ~params.ShowNegX, params.XNegMax = 0; end
        if ~params.ShowNegY, params.YNegMax = 0; end
        
        % 生成坐标刻度
        [x_ticks, x_labels] = generate_axis(params.XNegMax, 0, params.XNegDelta,...
                                           params.XPosMax, params.XPosDelta,...
                                           params.XNegScale, params.XPosScale,...
                                           params.XNegUnit, params.XPosUnit);
        
        [y_ticks, y_labels] = generate_axis(params.YNegMax, 0, params.YNegDelta,...
                                           params.YPosMax, params.YPosDelta,...
                                           params.YNegScale, params.YPosScale,...
                                           params.YNegUnit, params.YPosUnit);
        
        % 创建图形
        figure
        axes('Layer','top'); % 创建顶层坐标系
        hold on
        
        % 设置坐标刻度属性
        set(gca, 'XTick', x_ticks, 'XTickLabel', x_labels,...
                 'YTick', y_ticks, 'YTickLabel', y_labels,...
                 'XAxisLocation', 'origin',...
                 'YAxisLocation', 'origin',...
                 'Box', 'off',...
                 'GridLineStyle', '--');
        
        % 设置坐标范围
        xlim([params.XNegMax params.XPosMax])
        ylim([params.YNegMax params.YPosMax])
        grid on
        
        % 绘制坐标轴线
        plot(xlim, [0 0], 'k', 'LineWidth', 1.2) % x轴
        plot([0 0], ylim, 'k', 'LineWidth', 1.2) % y轴
    end
    
    function [ticks, labels] = generate_axis(min_val, origin, delta_neg,...
                                            max_val, delta_pos,...
                                            scale_neg, scale_pos,...
                                            unit_neg, unit_pos)
    % 生成单轴刻度和标签
        neg_ticks = fliplr(origin:-delta_neg:min_val);
        pos_ticks = origin:delta_pos:max_val;
        ticks = unique([neg_ticks, pos_ticks]);
        
        labels = arrayfun(@(x) format_label(x, scale_neg, scale_pos,...
                            unit_neg, unit_pos), ticks, 'UniformOutput', false);
    end
    
    function label = format_label(val, scale_neg, scale_pos, unit_neg, unit_pos)
    % 格式化标签文本
        if val < 0
            scaled = abs(val) * scale_neg;
            unit = unit_neg;
        else
            scaled = val * scale_pos;
            unit = unit_pos;
        end
        
        if contains(unit, '\circ')  % 处理角度符号
            label = sprintf('%d%s', round(scaled), unit);
        else
            label = sprintf('%.2f%s', scaled, unit);
        end
    end
    