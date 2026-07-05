import { ImageResponse } from "next/og";

export const alt = "LottoScopeX — Lottery Analytics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B5C3A 0%, #0F7048 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 84,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: -2,
          }}
        >
          LottoScope
          <span style={{ color: "#D4AF37" }}>X</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#D6F3E5",
            maxWidth: 900,
          }}
        >
          Statistics &amp; patterns across 7 major European &amp; US lotteries
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
          }}
        >
          {["EuroMillions", "EuroJackpot", "Lotto 6aus49", "Loto", "Irish Lotto", "Powerball", "Mega Millions"].map(
            (name) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.1)",
                  color: "#EAF9F1",
                  fontSize: 20,
                }}
              >
                {name}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
