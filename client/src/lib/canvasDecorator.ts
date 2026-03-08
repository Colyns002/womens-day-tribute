/**
 * Canvas Decoration Engine
 * Design System: Soft Modernism with Botanical Elegance
 * - Adds floral doodles, hearts, sparkles, and badge
 * - Uses Women's Day color palette
 * - Applies elegant typography for personal message
 */

const COLORS = {
  deepMauve: "#9B6B9E",
  softPurple: "#D4A5D4",
  sageGreen: "#A8B8A8",
  cream: "#F5F3F0",
  lightPink: "#E8C4D8",
  charcoal: "#2C2C2C",
  plum: "#6B4C7A",
};

interface DoodleElement {
  x: number;
  y: number;
  size: number;
  type: "heart" | "sparkle" | "flower" | "leaf" | "crown";
  color: string;
  rotation?: number;
}

// Generate random doodles based on image dimensions
function generateDoodles(width: number, height: number): DoodleElement[] {
  const doodles: DoodleElement[] = [];
  const doodleTypes: Array<"heart" | "sparkle" | "flower" | "leaf" | "crown"> = [
    "heart",
    "sparkle",
    "flower",
    "leaf",
    "crown",
  ];
  const colors = [COLORS.softPurple, COLORS.deepMauve, COLORS.sageGreen, COLORS.lightPink];

  // Add doodles around the edges and corners
  const positions = [
    // Top corners
    { x: width * 0.1, y: height * 0.1 },
    { x: width * 0.9, y: height * 0.1 },
    // Bottom corners
    { x: width * 0.1, y: height * 0.9 },
    { x: width * 0.9, y: height * 0.9 },
    // Sides
    { x: width * 0.05, y: height * 0.5 },
    { x: width * 0.95, y: height * 0.5 },
    // Additional scattered positions
    { x: width * 0.2, y: height * 0.15 },
    { x: width * 0.8, y: height * 0.2 },
    { x: width * 0.15, y: height * 0.85 },
    { x: width * 0.85, y: height * 0.8 },
  ];

  positions.forEach((pos, index) => {
    doodles.push({
      x: pos.x + (Math.random() - 0.5) * width * 0.05,
      y: pos.y + (Math.random() - 0.5) * height * 0.05,
      size: 20 + Math.random() * 30,
      type: doodleTypes[index % doodleTypes.length],
      color: colors[index % colors.length],
      rotation: Math.random() * Math.PI * 2,
    });
  });

  return doodles;
}

// Draw individual doodle elements
function drawDoodle(ctx: CanvasRenderingContext2D, doodle: DoodleElement) {
  ctx.save();
  ctx.translate(doodle.x, doodle.y);
  ctx.rotate(doodle.rotation || 0);
  ctx.fillStyle = doodle.color;
  ctx.strokeStyle = doodle.color;
  ctx.lineWidth = 2;

  switch (doodle.type) {
    case "heart":
      drawHeart(ctx, 0, 0, doodle.size);
      break;
    case "sparkle":
      drawSparkle(ctx, 0, 0, doodle.size);
      break;
    case "flower":
      drawFlower(ctx, 0, 0, doodle.size);
      break;
    case "leaf":
      drawLeaf(ctx, 0, 0, doodle.size);
      break;
    case "crown":
      drawCrown(ctx, 0, 0, doodle.size);
      break;
  }

  ctx.restore();
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const scale = size / 20;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.moveTo(x, y + 5 * scale);
  ctx.bezierCurveTo(
    x - 8 * scale,
    y - 8 * scale,
    x - 15 * scale,
    y - 5 * scale,
    x - 15 * scale,
    y - 2 * scale
  );
  ctx.bezierCurveTo(
    x - 15 * scale,
    y + 5 * scale,
    x - 5 * scale,
    y + 12 * scale,
    x,
    y + 15 * scale
  );
  ctx.bezierCurveTo(
    x + 5 * scale,
    y + 12 * scale,
    x + 15 * scale,
    y + 5 * scale,
    x + 15 * scale,
    y - 2 * scale
  );
  ctx.bezierCurveTo(
    x + 15 * scale,
    y - 5 * scale,
    x + 8 * scale,
    y - 8 * scale,
    x,
    y + 5 * scale
  );
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const scale = size / 20;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.moveTo(x, y - 10 * scale);
  ctx.lineTo(x + 3 * scale, y - 3 * scale);
  ctx.lineTo(x + 10 * scale, y);
  ctx.lineTo(x + 3 * scale, y + 3 * scale);
  ctx.lineTo(x, y + 10 * scale);
  ctx.lineTo(x - 3 * scale, y + 3 * scale);
  ctx.lineTo(x - 10 * scale, y);
  ctx.lineTo(x - 3 * scale, y - 3 * scale);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawFlower(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const scale = size / 20;
  const petals = 5;
  const petalSize = 8 * scale;
  ctx.globalAlpha = 0.8;

  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    const px = x + Math.cos(angle) * 10 * scale;
    const py = y + Math.sin(angle) * 10 * scale;

    ctx.beginPath();
    ctx.ellipse(px, py, petalSize, petalSize * 1.5, angle, 0, Math.PI * 2);
    ctx.fill();
  }

  // Center
  ctx.fillStyle = COLORS.deepMauve;
  ctx.beginPath();
  ctx.arc(x, y, 4 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const scale = size / 20;
  ctx.beginPath();
  ctx.ellipse(x, y, 5 * scale, 10 * scale, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawCrown(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const scale = size / 20;
  ctx.beginPath();
  ctx.moveTo(x - 12 * scale, y + 5 * scale);
  ctx.lineTo(x - 8 * scale, y - 8 * scale);
  ctx.lineTo(x - 4 * scale, y + 2 * scale);
  ctx.lineTo(x, y - 10 * scale);
  ctx.lineTo(x + 4 * scale, y + 2 * scale);
  ctx.lineTo(x + 8 * scale, y - 8 * scale);
  ctx.lineTo(x + 12 * scale, y + 5 * scale);
  ctx.lineTo(x - 12 * scale, y + 5 * scale);
  ctx.fill();
  ctx.stroke();
}

// Draw the "Happy Women's Day" badge
function drawBadge(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const badgeX = width * 0.5;
  const badgeY = height * 0.15;
  const badgeRadius = 90;

  // Badge background circle with gradient and shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;

  const gradient = ctx.createRadialGradient(badgeX, badgeY, 0, badgeX, badgeY, badgeRadius);
  gradient.addColorStop(0, COLORS.softPurple);
  gradient.addColorStop(0.7, COLORS.deepMauve);
  gradient.addColorStop(1, COLORS.plum);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2);
  ctx.fill();

  // Badge border
  ctx.strokeStyle = COLORS.cream;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.shadowColor = "transparent";

  // Badge text
  ctx.fillStyle = COLORS.cream;
  ctx.font = `bold 24px 'Playfair Display', serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Happy", badgeX, badgeY - 18);
  ctx.fillText("Women's Day", badgeX, badgeY + 18);
}

// Draw personal message with elegant typography
function drawMessage(
  ctx: CanvasRenderingContext2D,
  message: string,
  width: number,
  height: number
) {
  if (!message.trim()) return;

  const messageX = width * 0.5;
  const messageY = height * 0.82;
  const maxWidth = width * 0.75;

  // Message background with shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = `rgba(212, 165, 212, 0.2)`;
  ctx.beginPath();
  ctx.roundRect(messageX - maxWidth / 2 - 25, messageY - 50, maxWidth + 50, 100, 20);
  ctx.fill();

  // Message border
  ctx.strokeStyle = COLORS.softPurple;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.shadowColor = "transparent";

  // Message text with better styling
  ctx.fillStyle = COLORS.deepMauve;
  ctx.font = `italic 32px 'Caveat', cursive`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = COLORS.softPurple;

  // Word wrap with improved layout
  const words = message.split(" ");
  let line = "";
  let lineY = messageY - 10;
  const lineHeight = 40;

  words.forEach((word) => {
    const testLine = line + word + " ";
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth) {
      if (line) {
        ctx.fillText(line.trim(), messageX, lineY);
        lineY += lineHeight;
      }
      line = word + " ";
    } else {
      line = testLine;
    }
  });

  if (line) {
    ctx.fillText(line.trim(), messageX, lineY);
  }
}

// Main decoration function
export async function decorateImage(imageDataUrl: string, message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Failed to get canvas context");
        }

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Add semi-transparent overlay for better doodle visibility
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Generate and draw doodles
        const doodles = generateDoodles(canvas.width, canvas.height);
        doodles.forEach((doodle) => {
          drawDoodle(ctx, doodle);
        });

        // Add badge
        drawBadge(ctx, canvas.width, canvas.height);

        // Add personal message
        drawMessage(ctx, message, canvas.width, canvas.height);

        // Add decorative ribbon at bottom
        ctx.strokeStyle = COLORS.softPurple;
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.1, canvas.height * 0.95);
        ctx.lineTo(canvas.width * 0.9, canvas.height * 0.95);
        ctx.stroke();
        ctx.setLineDash([]);

        // Convert to data URL
        const decoratedUrl = canvas.toDataURL("image/png");
        resolve(decoratedUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageDataUrl;
  });
}
