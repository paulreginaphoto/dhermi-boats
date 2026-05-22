import Image from "next/image";
import { assetPath } from "@/lib/site";

const iconFiles = {
  anchor: "anchor.png",
  boat: "motor-boat.png",
  calendar: "calendar.png",
  camera: "camera.png",
  chat: "chat.png",
  check: "check.png",
  clock: "clock.png",
  email: "email.png",
  euro: "euro.png",
  globe: "globe.png",
  group: "group.png",
  phone: "phone.png",
  pin: "pin.png",
  ticket: "ticket.png",
  video: "video.png"
} as const;

export type Icon3DName = keyof typeof iconFiles;

export function Icon3D({
  name,
  alt,
  size = 44,
  className = ""
}: {
  name: Icon3DName;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={assetPath(`/icons/fluent-emoji-3d/${iconFiles[name]}`)}
      alt={alt}
      width={size}
      height={size}
      className={["shrink-0 object-contain", className].filter(Boolean).join(" ")}
    />
  );
}
