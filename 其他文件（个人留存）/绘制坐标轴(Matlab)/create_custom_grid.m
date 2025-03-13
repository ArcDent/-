%留存吧，这个还行
function create_square_grid()
    % 参数输入部分 =======================================================
    % 在这里修改自定义参数
    show_neg_x = true;      % 是否显示x轴负向（true/false）
    show_neg_y = true;      % 是否显示y轴负向（true/false）
    
    % X轴参数设置
    x_max = 1000;             % x轴正向最大显示范围（格数）
    x_pos_step = 1;         % x轴正向单位长度（实际值/格）
    x_neg_step = 1;       % x轴负向单位长度（实际值/格）
    
    % Y轴参数设置
    y_max = 1000;             % y轴正向最大显示范围（格数）
    y_pos_step = 1;         % y轴正向单位长度（实际值/格）
    y_neg_step = 1;       % y轴负向单位长度（实际值/格）
    
    % 通用参数设置
    label_interval = 2;     % 坐标标签显示间隔（每n格显示一次）
    axis_unit_label = {'I', 'U'}; % 坐标轴标签（格式：A/B）
    grid_linewidth = 0.5;   % 网格线宽
    % 参数设置结束 ======================================================

    % 创建图形窗口
    fig = figure('Color','w','Units','centimeters','Position',[0 0 21 29.7]);
    ax = axes('Parent',fig,'Layer','top','Box','off');
    
    % 计算实际坐标范围 ==================================================
    % X轴范围计算
    x_pos_limit = x_max * x_pos_step;
    x_neg_limit = -x_max * x_neg_step;
    x_actual_max = max(x_pos_limit, -x_neg_limit);
    
    % Y轴范围计算
    y_pos_limit = y_max * y_pos_step;
    y_neg_limit = -y_max * y_neg_step;
    y_actual_max = max(y_pos_limit, -y_neg_limit);
    
    % 设置坐标轴范围并保持1:1比例
    axis(ax, [x_neg_limit x_pos_limit y_neg_limit y_pos_limit]);
    axis(ax, 'equal');  % 关键设置：保证网格为正方形
    hold(ax, 'on');
    
    % 生成网格刻度 ======================================================
    % X轴刻度生成
    x_pos_ticks = 0:x_pos_step:x_pos_limit;
    if show_neg_x
        x_neg_ticks = 0:-x_neg_step:x_neg_limit;
        x_ticks = unique([x_neg_ticks, x_pos_ticks]);
    else
        x_ticks = x_pos_ticks;
    end
    
    % Y轴刻度生成
    y_pos_ticks = 0:y_pos_step:y_pos_limit;
    if show_neg_y
        y_neg_ticks = 0:-y_neg_step:y_neg_limit;
        y_ticks = unique([y_neg_ticks, y_pos_ticks]);
    else
        y_ticks = y_pos_ticks;
    end
    
    % 设置坐标刻度
    set(ax, 'XTick', x_ticks, 'YTick', y_ticks);
    
    % 创建网格系统 ======================================================
    % 绘制主网格线
    grid(ax, 'on');
    ax.GridLineStyle = '-';
    ax.GridAlpha = 1;
    ax.GridColor = [0 0 0];
    ax.LineWidth = grid_linewidth;
    
    % 关闭自动缩放
    ax.XLimMode = 'manual';
    ax.YLimMode = 'manual';
    
    % 配置坐标标签 ======================================================
    % X轴标签生成（仅数值）
    x_labels = cell(size(x_ticks));
    for i = 1:length(x_ticks)
        if mod(find(x_ticks == x_ticks(i),1)-1, label_interval) == 0
            x_labels{i} = num2str(x_ticks(i));
        else
            x_labels{i} = '';
        end
    end
    
    % Y轴标签生成（仅数值）
    y_labels = cell(size(y_ticks));
    for i = 1:length(y_ticks)
        if mod(find(y_ticks == y_ticks(i),1)-1, label_interval) == 0
            y_labels{i} = num2str(y_ticks(i));
        else
            y_labels{i} = '';
        end
    end
    
    set(ax, 'XTickLabel', x_labels, 'YTickLabel', y_labels,...
            'TickDir','out','XColor',[0 0 0],'YColor',[0 0 0]);
    
    % 绘制坐标轴箭头 ====================================================
    % X轴箭头（使用相对坐标定位）
    annotation(fig, 'arrow', [0.93 0.97], [0.5 0.5],...
              'LineWidth', 1.5, 'HeadWidth', 15, 'Color', [0 0 0]);
    
    % Y轴箭头
    annotation(fig, 'arrow', [0.5 0.5], [0.93 0.97],...
              'LineWidth', 1.5, 'HeadWidth', 15, 'Color', [0 0 0]);
    
    % 添加轴标签 ========================================================
    text(ax, x_pos_limit*1.05, 0, axis_unit_label{1},...
        'VerticalAlignment','middle','HorizontalAlignment','left');
    text(ax, 0, y_pos_limit*1.05, axis_unit_label{2},...
        'VerticalAlignment','bottom','HorizontalAlignment','center');
    
    % 打印设置 ==========================================================
    set(fig, 'PaperPositionMode', 'auto',...
             'PaperOrientation', 'portrait',...
             'PaperSize', [29.7 21],... % A4尺寸
             'PaperPosition', [0 0 21 29.7]);
    
    hold(ax, 'off');
end
