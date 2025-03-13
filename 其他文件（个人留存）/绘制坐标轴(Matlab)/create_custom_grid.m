%坠机，准备用纸画了...
function create_custom_grid()
    % 参数输入部分 =======================================================
    % 在这里修改自定义参数
    show_neg_x = true;      % 是否显示x轴负向（true/false）
    show_neg_y = true;      % 是否显示y轴负向（true/false）
    
    % X轴参数设置
    x_max = 100;            % x轴正向最大显示范围
    x_pos_step = 2;         % x轴正向单位长度（实际值/格）
    x_pos_unit_factor = 1;  % x轴正向单位转换因子（如毫伏用1e-3）
    x_pos_unit_label = 'V'; % x轴正向单位标签
    
    x_neg_step = 2;       % x轴负向单位长度（实际值/格）
    x_neg_unit_factor = 1;  % x轴负向单位转换因子
    x_neg_unit_label = 'V'; % x轴负向单位标签
    
    % Y轴参数设置
    y_max = 100;              % y轴正向最大显示范围
    y_pos_step = 0.5;       % y轴正向单位长度（实际值/格）
    y_pos_unit_factor = 1;  % y轴正向单位转换因子
    y_pos_unit_label = 'A'; % y轴正向单位标签
    
    y_neg_step = 0.5;      % y轴负向单位长度（实际值/格）
    y_neg_unit_factor = 1;  % y轴负向单位转换因子
    y_neg_unit_label = 'A'; % y轴负向单位标签
    
    % 通用参数设置
    label_interval = 2;     % 坐标标签显示间隔（每n格显示一次）
    arrow_length = 0.5;     % 箭头超出坐标轴的长度（单位：格）
    grid_linewidth = 0.5;   % 网格线宽
    % 参数设置结束 ======================================================

    % 创建图形窗口
    figure('Color','w','Units','centimeters','Position',[0 0 21 29.7]); % A4纸尺寸
    axes('Layer','top','Box','off');
    
    % 生成坐标刻度 ======================================================
    % X轴刻度生成
    x_pos_ticks = 0:x_pos_step:x_max;
    if show_neg_x
        x_neg_ticks = 0:-x_neg_step:-x_max;
        x_ticks = unique([x_neg_ticks, x_pos_ticks]);
    else
        x_ticks = x_pos_ticks;
    end
    
    % Y轴刻度生成
    y_pos_ticks = 0:y_pos_step:y_max;
    if show_neg_y
        y_neg_ticks = 0:-y_neg_step:-y_max;
        y_ticks = unique([y_neg_ticks, y_pos_ticks]);
    else
        y_ticks = y_pos_ticks;
    end
    
    % 设置坐标轴范围
    xlim([min(x_ticks)-arrow_length*x_pos_step, max(x_ticks)+arrow_length*x_pos_step]);
    ylim([min(y_ticks)-arrow_length*y_pos_step, max(y_ticks)+arrow_length*y_pos_step]);
    
    % 生成坐标标签 ======================================================
    % X轴标签
    x_labels = cell(size(x_ticks));
    for i = 1:length(x_ticks)
        if mod(i-1,label_interval) == 0
            if x_ticks(i) >= 0
                x_labels{i} = sprintf('%.1f', x_ticks(i)*x_pos_unit_factor);
            else
                x_labels{i} = sprintf('%.1f', x_ticks(i)*x_neg_unit_factor);
            end
        else
            x_labels{i} = '';
        end
    end
    
    % Y轴标签
    y_labels = cell(size(y_ticks));
    for i = 1:length(y_ticks)
        if mod(i-1,label_interval) == 0
            if y_ticks(i) >= 0
                y_labels{i} = sprintf('%.2f', y_ticks(i)*y_pos_unit_factor);
            else
                y_labels{i} = sprintf('%.2f', y_ticks(i)*y_neg_unit_factor);
            end
        else
            y_labels{i} = '';
        end
    end
    
    % 设置坐标轴
    set(gca, 'XTick', x_ticks, 'XTickLabel', x_labels,...
             'YTick', y_ticks, 'YTickLabel', y_labels,...
             'XMinorTick','on','YMinorTick','on',...
             'TickDir','out','LineWidth',1.5);
    
    % 绘制网格
    grid on;
    set(gca, 'GridLineStyle','-','GridAlpha',1,'GridColor',[0.5 0.5 0.5],...
             'MinorGridLineStyle','-','MinorGridAlpha',0.3,'MinorGridColor',[0.7 0.7 0.7]);
    
    % 绘制坐标轴箭头 ====================================================
    % X轴箭头
    annotation('arrow',[0.93 0.97], [0.5 0.5],'LineWidth',1.5,'HeadWidth',10);
    % Y轴箭头
    annotation('arrow',[0.5 0.5], [0.93 0.97],'LineWidth',1.5,'HeadWidth',10);
    
    % 添加坐标轴标签 ====================================================
    text(max(x_ticks)+arrow_length*x_pos_step*0.8, 0,...
        ['X/' x_pos_unit_label],'HorizontalAlignment','left','VerticalAlignment','middle');
    text(0, max(y_ticks)+arrow_length*y_pos_step*0.8,...
        ['Y/' y_pos_unit_label],'HorizontalAlignment','center','VerticalAlignment','bottom');
    
    % 打印设置 ==========================================================
    set(gcf, 'PaperPositionMode', 'auto',...
             'PaperOrientation', 'portrait',...
             'PaperSize', [29.7 21]); % A4纸尺寸（21cm x 29.7cm）
end
