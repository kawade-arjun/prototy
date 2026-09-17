import React from 'react';
import { 
  Smartphone, 
  Tablet, 
  Laptop, 
  Monitor, 
  RotateCw, 
  Wifi, 
  Battery, 
  Signal,
  Maximize2,
  Smartphone as PhonePlus
} from 'lucide-react';

export type DeviceRatio = 'responsive' | 'mobile' | 'mobile_plus' | 'tablet' | 'laptop' | 'desktop';
export type DeviceOrientation = 'portrait' | 'landscape';

interface DeviceFrameProps {
  deviceRatio: DeviceRatio;
  orientation: DeviceOrientation;
  scale: number;
  onDeviceChange: (ratio: DeviceRatio) => void;
  onOrientationToggle: () => void;
  onScaleChange: (scale: number) => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceRatio,
  orientation,
  scale,
  onDeviceChange,
  onOrientationToggle,
  onScaleChange,
  children
}) => {
  if (deviceRatio === 'responsive') {
    return <>{children}</>;
  }

  // Dimension mapping based on selected ratio and orientation
  const getDimensions = () => {
    const isLandscape = orientation === 'landscape';

    switch (deviceRatio) {
      case 'mobile':
        return isLandscape 
          ? { width: 768, height: 420, label: 'Mobile (iPhone 15 • 768×420)' }
          : { width: 375, height: 768, label: 'Mobile (iPhone 15 • 375×768)' };
      case 'mobile_plus':
        return isLandscape 
          ? { width: 840, height: 440, label: 'Mobile Max (414×840)' }
          : { width: 414, height: 840, label: 'Mobile Max (414×840)' };
      case 'tablet':
        return isLandscape 
          ? { width: 1024, height: 768, label: 'Tablet (iPad • 1024×768)' }
          : { width: 768, height: 980, label: 'Tablet (iPad • 768×980)' };
      case 'laptop':
        return { width: 1024, height: 720, label: 'Laptop (16:10 • 1024×720)' };
      case 'desktop':
        return { width: 1280, height: 780, label: 'Desktop (16:9 • 1280×780)' };
      default:
        return { width: '100%', height: 'auto', label: 'Responsive' };
    }
  };

  const dim = getDimensions();
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="w-full flex flex-col items-center justify-start py-4 px-2 overflow-x-auto transition-all">
      
      {/* Device Simulator Control Bar */}
      <div className="mb-4 p-2 sm:p-2.5 rounded-2xl bg-white/90 dark:bg-[#0c1222]/90 backdrop-blur-xl border border-slate-200 dark:border-white/[0.08] shadow-xl flex flex-wrap items-center justify-between gap-3 max-w-4xl w-full text-xs z-30">
        
        {/* Device Aspect Ratio Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onDeviceChange('responsive')}
            className="px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <Maximize2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Fluid Full</span>
          </button>

          <button
            onClick={() => onDeviceChange('mobile')}
            className={`px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              deviceRatio === 'mobile' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Mobile 375p</span>
          </button>

          <button
            onClick={() => onDeviceChange('mobile_plus')}
            className={`px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              deviceRatio === 'mobile_plus' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <PhonePlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mobile+ 414p</span>
          </button>

          <button
            onClick={() => onDeviceChange('tablet')}
            className={`px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              deviceRatio === 'tablet' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Tablet className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tablet 768p</span>
          </button>

          <button
            onClick={() => onDeviceChange('laptop')}
            className={`px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              deviceRatio === 'laptop' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-purple-400" />
            <span>Laptop 1024p</span>
          </button>

          <button
            onClick={() => onDeviceChange('desktop')}
            className={`px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              deviceRatio === 'desktop' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-rose-400" />
            <span>Desktop 1280p</span>
          </button>
        </div>

        {/* Device Controls: Rotate & Zoom Scale */}
        <div className="flex items-center gap-2">
          
          {/* Rotate Orientation Button (Mobile/Tablet) */}
          {(deviceRatio === 'mobile' || deviceRatio === 'mobile_plus' || deviceRatio === 'tablet') && (
            <button
              onClick={onOrientationToggle}
              className="p-1.5 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/20 font-medium flex items-center gap-1.5 transition-all"
              title="Rotate Screen (Portrait / Landscape)"
            >
              <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
              <span className="capitalize">{orientation}</span>
            </button>
          )}

          {/* Scale Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            <span className="text-[10px] text-slate-400 px-1 font-bold">Zoom:</span>
            {[1, 0.9, 0.8, 0.75].map((s) => (
              <button
                key={s}
                onClick={() => onScaleChange(s)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                  scale === s 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
                }`}
              >
                {Math.round(s * 100)}%
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Realistic Device Frame */}
      <div 
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: typeof dim.width === 'number' ? `${dim.width}px` : dim.width,
          height: typeof dim.height === 'number' ? `${dim.height}px` : dim.height,
        }}
        className="relative transition-all duration-300 shadow-2xl rounded-[36px] sm:rounded-[44px] border-[10px] sm:border-[12px] border-slate-900 dark:border-slate-950 bg-slate-900 dark:bg-slate-950 ring-1 ring-slate-700/50 dark:ring-white/10 flex flex-col overflow-hidden shrink-0"
      >
        
        {/* Simulated Mobile Status Bar (Visible on Mobile / Tablet) */}
        {(deviceRatio === 'mobile' || deviceRatio === 'mobile_plus' || deviceRatio === 'tablet') && (
          <div className="w-full bg-white dark:bg-[#060911] text-slate-800 dark:text-slate-200 px-6 pt-2 pb-1 flex items-center justify-between text-[11px] font-semibold border-b border-slate-200/50 dark:border-white/[0.04] shrink-0 select-none z-20">
            <span>{currentTime}</span>
            
            {/* Dynamic Island / Notch Mockup */}
            <div className="w-20 h-4 rounded-full bg-slate-900 dark:bg-black mx-auto flex items-center justify-center gap-1.5 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </div>

            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3 text-slate-600 dark:text-slate-400" />
              <Wifi className="w-3 h-3 text-slate-600 dark:text-slate-400" />
              <Battery className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            </div>
          </div>
        )}

        {/* Laptop/Desktop Header Bar */}
        {(deviceRatio === 'laptop' || deviceRatio === 'desktop') && (
          <div className="w-full bg-slate-800 dark:bg-slate-900 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-700/50 shrink-0 select-none z-20">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-[10px] text-slate-300">careerlens.gov.in • {dim.label}</span>
            </div>
            <span className="font-bold text-indigo-400">{dim.label}</span>
          </div>
        )}

        {/* Scrollable Viewport Container holding the App */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-[#060911] text-slate-900 dark:text-slate-100 flex flex-col relative">
          {children}
        </div>

        {/* Simulated Mobile Home Bar Indicator */}
        {(deviceRatio === 'mobile' || deviceRatio === 'mobile_plus' || deviceRatio === 'tablet') && (
          <div className="w-full bg-white dark:bg-[#060911] py-1 flex items-center justify-center shrink-0 z-20 border-t border-slate-200/50 dark:border-white/[0.04]">
            <div className="w-28 h-1 rounded-full bg-slate-400 dark:bg-slate-600" />
          </div>
        )}

      </div>

      {/* Frame Dimensions Caption */}
      <div className="mt-3 text-center text-[11px] font-mono text-slate-500 dark:text-slate-400">
        Simulated Viewport: <span className="font-bold text-indigo-600 dark:text-indigo-400">{dim.label}</span>
      </div>

    </div>
  );
};
