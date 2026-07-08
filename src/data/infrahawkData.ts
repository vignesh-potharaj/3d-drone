export interface SequenceData {
  id: string;
  title: string;
  subtitle: string;
  desktopPath: string;
  mobilePath: string;
  frameCount: number;
  specifications: string[];
}

export const infrahawkData = {
  hero: {
    title: "INFRAHAWK",
    subtitle: "Next-generation tactical autonomous system. 850 kW hybrid engine.",
    videoPath: "/videos/Video Project 6.mp4",
    telemetry: {
      altitude: "1,240 FT",
      speed: "340 KTS",
      payload: "READY",
      lock: "ACQUIRED",
    }
  },
  sequences: [
    {
      id: "vulcan",
      title: "VULCAN M134",
      subtitle: "6,000 rounds per minute. Unrivaled suppression.",
      desktopPath: "/images/mini-desktop/",
      mobilePath: "/images/mini-mobile/",
      frameCount: 120,
      specifications: [
        "CALIBER: 7.62x51mm NATO",
        "RATE OF FIRE: 100 RDS/SEC",
        "BARRELS: 6x ROTATING",
        "STATUS: ENGAGED"
      ]
    },
    {
      id: "rotor",
      title: "SILENT FLIGHT",
      subtitle: "Dual-rotor system. Acoustic signature reduced by 60%.",
      desktopPath: "/images/blades-desktop/",
      mobilePath: "/images/blades-mobile/",
      frameCount: 120,
      specifications: [
        "PROPULSION: DUAL ROTOR",
        "DB NOISE LEVEL: -42dBA",
        "RPM MAX: 3,200 RPM",
        "PROP: FULL CARBON WING"
      ]
    },
    {
      id: "chassis",
      title: "TITANIUM CORE",
      subtitle: "Military-grade composite frame. Ready for deployment.",
      desktopPath: "/images/drone-desktop/",
      mobilePath: "/images/drone-mobile/",
      frameCount: 60,
      specifications: [
        "ARMOR: GRADE 5 TITANIUM",
        "THERMAL SIGNATURE: SHIELDED",
        "MAX LOAD: 450 KG",
        "INTEGRITY: 100%"
      ]
    }
  ]
};
