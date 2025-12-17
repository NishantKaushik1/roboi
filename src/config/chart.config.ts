/**
 * Chart Configuration
 * Default ECharts configurations and themes
 */

export const CHART_CONFIG = {
  // Default Theme Colors
  colors: {
    primary: ['#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
    success: ['#22c55e', '#10b981', '#14b8a6'],
    warning: ['#f59e0b', '#f97316', '#ef4444'],
    danger: ['#ef4444', '#dc2626', '#b91c1c'],
    neutral: ['#64748b', '#475569', '#334155'],
  },

  // Default Grid Configuration
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '10%',
    containLabel: true,
  },

  // Default Tooltip Configuration
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'transparent',
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },

  // Default Legend Configuration
  legend: {
    top: 0,
    left: 'center',
    textStyle: {
      color: '#64748b',
      fontSize: 12,
    },
  },

  // Default Title Configuration
  title: {
    textStyle: {
      color: '#1e293b',
      fontSize: 16,
      fontWeight: 600,
    },
    subtextStyle: {
      color: '#64748b',
      fontSize: 12,
    },
  },

  // Default Axis Configuration
  xAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#e2e8f0',
      },
    },
    axisLabel: {
      color: '#64748b',
      fontSize: 11,
    },
    splitLine: {
      show: false,
    },
  },

  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#64748b',
      fontSize: 11,
    },
    splitLine: {
      lineStyle: {
        color: '#f1f5f9',
        type: 'dashed',
      },
    },
  },

  // Animation Configuration
  animation: {
    duration: 1000,
    easing: 'cubicOut',
  },

  // Responsive Configuration
  responsive: true,

  // Chart-specific Configurations
  line: {
    smooth: true,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: {
      width: 2,
    },
    areaStyle: {
      opacity: 0.1,
    },
  },

  bar: {
    barWidth: '60%',
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
    },
  },

  pie: {
    radius: ['40%', '70%'],
    avoidLabelOverlap: true,
    itemStyle: {
      borderRadius: 8,
      borderColor: '#fff',
      borderWidth: 2,
    },
    label: {
      show: true,
      fontSize: 12,
      color: '#64748b',
    },
    emphasis: {
      label: {
        show: true,
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
  },

  gauge: {
    radius: '75%',
    startAngle: 180,
    endAngle: 0,
    axisLine: {
      lineStyle: {
        width: 20,
        color: [
          [0.3, '#ef4444'],
          [0.7, '#f59e0b'],
          [1, '#22c55e'],
        ],
      },
    },
    pointer: {
      itemStyle: {
        color: 'auto',
      },
    },
    axisTick: {
      distance: -20,
      length: 5,
      lineStyle: {
        color: '#fff',
        width: 1,
      },
    },
    splitLine: {
      distance: -20,
      length: 20,
      lineStyle: {
        color: '#fff',
        width: 2,
      },
    },
    axisLabel: {
      color: 'auto',
      distance: 30,
      fontSize: 12,
    },
    detail: {
      valueAnimation: true,
      formatter: '{value}%',
      color: 'auto',
      fontSize: 20,
      fontWeight: 'bold',
    },
  },

  heatmap: {
    label: {
      show: true,
    },
    itemStyle: {
      borderWidth: 1,
      borderColor: '#fff',
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  },

  // Dark Mode Overrides
  darkMode: {
    backgroundColor: '#1e293b',
    textStyle: {
      color: '#e2e8f0',
    },
    title: {
      textStyle: {
        color: '#f1f5f9',
      },
      subtextStyle: {
        color: '#94a3b8',
      },
    },
    legend: {
      textStyle: {
        color: '#94a3b8',
      },
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#334155',
        },
      },
      axisLabel: {
        color: '#94a3b8',
      },
    },
    yAxis: {
      axisLabel: {
        color: '#94a3b8',
      },
      splitLine: {
        lineStyle: {
          color: '#334155',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
    },
  },
};

export default CHART_CONFIG;
