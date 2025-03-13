%����ɣ��������
function create_square_grid()
    % �������벿�� =======================================================
    % �������޸��Զ������
    show_neg_x = true;      % �Ƿ���ʾx�Ḻ��true/false��
    show_neg_y = true;      % �Ƿ���ʾy�Ḻ��true/false��
    
    % X���������
    x_max = 1000;             % x�����������ʾ��Χ��������
    x_pos_step = 1;         % x������λ���ȣ�ʵ��ֵ/��
    x_neg_step = 1;       % x�Ḻ��λ���ȣ�ʵ��ֵ/��
    
    % Y���������
    y_max = 1000;             % y�����������ʾ��Χ��������
    y_pos_step = 1;         % y������λ���ȣ�ʵ��ֵ/��
    y_neg_step = 1;       % y�Ḻ��λ���ȣ�ʵ��ֵ/��
    
    % ͨ�ò�������
    label_interval = 2;     % �����ǩ��ʾ�����ÿn����ʾһ�Σ�
    axis_unit_label = {'I', 'U'}; % �������ǩ����ʽ��A/B��
    grid_linewidth = 0.5;   % �����߿�
    % �������ý��� ======================================================

    % ����ͼ�δ���
    fig = figure('Color','w','Units','centimeters','Position',[0 0 21 29.7]);
    ax = axes('Parent',fig,'Layer','top','Box','off');
    
    % ����ʵ�����귶Χ ==================================================
    % X�᷶Χ����
    x_pos_limit = x_max * x_pos_step;
    x_neg_limit = -x_max * x_neg_step;
    x_actual_max = max(x_pos_limit, -x_neg_limit);
    
    % Y�᷶Χ����
    y_pos_limit = y_max * y_pos_step;
    y_neg_limit = -y_max * y_neg_step;
    y_actual_max = max(y_pos_limit, -y_neg_limit);
    
    % ���������᷶Χ������1:1����
    axis(ax, [x_neg_limit x_pos_limit y_neg_limit y_pos_limit]);
    axis(ax, 'equal');  % �ؼ����ã���֤����Ϊ������
    hold(ax, 'on');
    
    % ��������̶� ======================================================
    % X��̶�����
    x_pos_ticks = 0:x_pos_step:x_pos_limit;
    if show_neg_x
        x_neg_ticks = 0:-x_neg_step:x_neg_limit;
        x_ticks = unique([x_neg_ticks, x_pos_ticks]);
    else
        x_ticks = x_pos_ticks;
    end
    
    % Y��̶�����
    y_pos_ticks = 0:y_pos_step:y_pos_limit;
    if show_neg_y
        y_neg_ticks = 0:-y_neg_step:y_neg_limit;
        y_ticks = unique([y_neg_ticks, y_pos_ticks]);
    else
        y_ticks = y_pos_ticks;
    end
    
    % ��������̶�
    set(ax, 'XTick', x_ticks, 'YTick', y_ticks);
    
    % ��������ϵͳ ======================================================
    % ������������
    grid(ax, 'on');
    ax.GridLineStyle = '-';
    ax.GridAlpha = 1;
    ax.GridColor = [0 0 0];
    ax.LineWidth = grid_linewidth;
    
    % �ر��Զ�����
    ax.XLimMode = 'manual';
    ax.YLimMode = 'manual';
    
    % ���������ǩ ======================================================
    % X���ǩ���ɣ�����ֵ��
    x_labels = cell(size(x_ticks));
    for i = 1:length(x_ticks)
        if mod(find(x_ticks == x_ticks(i),1)-1, label_interval) == 0
            x_labels{i} = num2str(x_ticks(i));
        else
            x_labels{i} = '';
        end
    end
    
    % Y���ǩ���ɣ�����ֵ��
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
    
    % �����������ͷ ====================================================
    % X���ͷ��ʹ��������궨λ��
    annotation(fig, 'arrow', [0.93 0.97], [0.5 0.5],...
              'LineWidth', 1.5, 'HeadWidth', 15, 'Color', [0 0 0]);
    
    % Y���ͷ
    annotation(fig, 'arrow', [0.5 0.5], [0.93 0.97],...
              'LineWidth', 1.5, 'HeadWidth', 15, 'Color', [0 0 0]);
    
    % ������ǩ ========================================================
    text(ax, x_pos_limit*1.05, 0, axis_unit_label{1},...
        'VerticalAlignment','middle','HorizontalAlignment','left');
    text(ax, 0, y_pos_limit*1.05, axis_unit_label{2},...
        'VerticalAlignment','bottom','HorizontalAlignment','center');
    
    % ��ӡ���� ==========================================================
    set(fig, 'PaperPositionMode', 'auto',...
             'PaperOrientation', 'portrait',...
             'PaperSize', [29.7 21],... % A4�ߴ�
             'PaperPosition', [0 0 21 29.7]);
    
    hold(ax, 'off');
end
