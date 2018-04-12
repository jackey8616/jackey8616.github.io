L82, 109
            {% set date_updated_diff = full_date(post.date, theme.post_meta.updated_diff_check_format) != full_date(post.updated, theme.post_meta.updated_diff_check_format) %}
            {% if theme.post_meta.updated_at %}
              {% if !theme.post_meta.updated_diff || theme.post_meta.updated_diff && date_updated_diff %}
1 {{ theme.post_meta.updated_diff }}
2 {{ date_updated_diff }}
3 {{ theme.post_meta.updated_diff }}
                {% set display_updated = true %}
              {#% else %}
                {% set display_updated = false %#}
              {% endif %}
4 {{ display_updated }}

              {% if display_updated or !theme.post_meta.created_at %}
                {% if theme.post_meta.created_at and theme.post_meta.updated_at %}
                  <span class="post-meta-divider">|</span>
                {% endif %}

                <span class="post-meta-item-icon">
                  <i class="fa fa-calendar-check-o"></i>
                </span>
                {% if theme.post_meta.item_text %}
                  <span class="post-meta-item-text">{{ __('post.modified') + __('symbol.colon') }}</span>
                {% endif %}
                <time title="{{ __('post.modified') }}" itemprop="dateModified" datetime="{{ moment(post.updated).format() }}">
                  {{ full_date(post.updated, theme.post_meta.datetime_format) }}
                </time>
              {% endif %}
            {% endif %}
