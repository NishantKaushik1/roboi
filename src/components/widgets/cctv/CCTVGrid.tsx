import Image from 'next/image';

// Placeholder images for CCTV
// In a real app, these would be stream URLs.
const CAMERAS = [
    'https://images.unsplash.com/photo-1623136284144-6338fb58237e?w=800&auto=format&fit=crop&q=60', // Gas station 1
    'https://images.unsplash.com/photo-1520698246067-9c60e583f793?w=800&auto=format&fit=crop&q=60', // Gas station 2
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=60', // Car wash / service
    'https://images.unsplash.com/photo-1563607065608-460f7e4529af?w=800&auto=format&fit=crop&q=60', // Pump
];

export default function CCTVGrid() {
    return (
        <div className="relative h-full w-full">
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 bg-black">
                {CAMERAS.map((src, idx) => (
                    <div key={idx} className="relative h-full w-full overflow-hidden bg-gray-900 group">
                        <Image
                            src={src}
                            alt={`Camera ${idx + 1}`}
                            className="object-cover opacity-80 transition-opacity hover:opacity-100"
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            unoptimized
                        />
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm z-10">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500"></span>
                            CAM {idx + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
