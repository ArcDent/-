%׹����׼����ֽ����...
function create_custom_grid()
    % �������벿�� =======================================================
    % �������޸��Զ������
    show_neg_x = true;      % �Ƿ���ʾx�Ḻ��true/false��
    show_neg_y = true;      % �Ƿ���ʾy�Ḻ��true/false��
    
    % X���������
    x_max = 100;            % x�����������ʾ��Χ
    x_pos_step = 2;         % x������λ���ȣ�ʵ��ֵ/��
    x_pos_unit_factor = 1;  % x������λת�����ӣ��������1e-3��
    x_pos_unit_label = 'V'; % x������λ��ǩ
    
    x_neg_step = 2;       % x�Ḻ��λ���ȣ�ʵ��ֵ/��
    x_neg_unit_factor = 1;  % x�Ḻ��λת������
    x_neg_unit_label = 'V'; % x�Ḻ��λ��ǩ
    
    % Y���������
    y_max = 100;              % y�����������ʾ��Χ
    y_pos_step = 0.5;       % y������λ���ȣ�ʵ��ֵ/��
    y_pos_unit_factor = 1;  % y������λת������
    y_pos_unit_label = 'A'; % y������λ��ǩ
    
    y_neg_step = 0.5;      % y�Ḻ��λ���ȣ�ʵ��ֵ/��
    y_neg_unit_factor = 1;  % y�Ḻ��λת������
    y_neg_unit_label = 'A'; % y�Ḻ��λ��ǩ
    
    % ͨ�ò�������
    label_interval = 2;     % �����ǩ��ʾ�����ÿn����ʾһ�Σ�
    arrow_length = 0.5;     % ��ͷ����������ĳ��ȣ���λ����
    grid_linewidth = 0.5;   % �����߿�
    % �������ý��� ======================================================

    % ����ͼ�δ���
    figure('Color','w','Units','centimeters','Position',[0 0 21 29.7]); % A4ֽ�ߴ�
    axes('Layer','top','Box','off');
    
    % ��������̶� ======================================================
    % X��̶�����
    x_pos_ticks = 0:x_pos_step:x_max;
    if show_neg_x
        x_neg_ticks = 0:-x_neg_step:-x_max;
        x_ticks = unique([x_neg_ticks, x_pos_ticks]);
    else
        x_ticks = x_pos_ticks;
    end
    
    % Y��̶�����
    y_pos_ticks = 0:y_pos_step:y_max;
    if show_neg_y
        y_neg_ticks = 0:-y_neg_step:-y_max;
        y_ticks = unique([y_neg_ticks, y_pos_ticks]);
    else
        y_ticks = y_pos_ticks;
    end
    
    % ���������᷶Χ
    xlim([min(x_ticks)-arrow_length*x_pos_step, max(x_ticks)+arrow_length*x_pos_step]);
    ylim([min(y_ticks)-arrow_length*y_pos_step, max(y_ticks)+arrow_length*y_pos_step]);
    
    % ���������ǩ ======================================================
    % X���ǩ
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
    
    % Y���ǩ
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
    
    % ����������
    set(gca, 'XTick', x_ticks, 'XTickLabel', x_labels,...
             'YTick', y_ticks, 'YTickLabel', y_labels,...
             'XMinorTick','on','YMinorTick','on',...
             'TickDir','out','LineWidth',1.5);
    
    % ��������
    grid on;
    set(gca, 'GridLineStyle','-','GridAlpha',1,'GridColor',[0.5 0.5 0.5],...
             'MinorGridLineStyle','-','MinorGridAlpha',0.3,'MinorGridColor',[0.7 0.7 0.7]);
    
    % �����������ͷ ====================================================
    % X���ͷ
    annotation('arrow',[0.93 0.97], [0.5 0.5],'LineWidth',1.5,'HeadWidth',10);
    % Y���ͷ
    annotation('arrow',[0.5 0.5], [0.93 0.97],'LineWidth',1.5,'HeadWidth',10);
    
    % ����������ǩ ====================================================
    text(max(x_ticks)+arrow_length*x_pos_step*0.8, 0,...
        ['X/' x_pos_unit_label],'HorizontalAlignment','left','VerticalAlignment','middle');
    text(0, max(y_ticks)+arrow_length*y_pos_step*0.8,...
        ['Y/' y_pos_unit_label],'HorizontalAlignment','center','VerticalAlignment','bottom');
    
    % ��ӡ���� ==========================================================
    set(gcf, 'PaperPositionMode', 'auto',...
             'PaperOrientation', 'portrait',...
             'PaperSize', [29.7 21]); % A4ֽ�ߴ磨21cm x 29.7cm��
end
