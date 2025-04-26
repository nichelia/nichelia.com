export class Clock
{
  private radius;

  constructor(private renderer: CanvasRenderingContext2D, private x: number, private y: number) { }

  private setScene()
  {
    this.renderer.save();
    this.renderer.translate(this.x, this.y);
    this.radius = this.y * 0.90;
  }

  private resetScene()
  {
    this.renderer.restore();
  }

  private drawFace()
  {
    this.renderer.beginPath();
    this.renderer.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.renderer.fillStyle = 'white';
    this.renderer.fill();
  }

  private drawFrame()
  {
    const grad = this.renderer.createRadialGradient(0, 0, this.radius * 1, 0, 0, this.radius * 1.1);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    this.renderer.strokeStyle = grad;
    this.renderer.lineWidth = this.radius * 0.025;
    this.renderer.stroke();
  }

  private drawCentre()
  {
    this.renderer.beginPath();
    this.renderer.arc(0, 0, this.radius * 0.05, 0, 2 * Math.PI);
    this.renderer.fillStyle = '#333';
    this.renderer.fill();
  }

  private drawNumbers()
  {
    this.renderer.font = this.radius * 0.08 + "px arial";
    this.renderer.textBaseline = "middle";
    this.renderer.textAlign = "center";

    var hour;
    var angle;
    for(hour = 1; hour < 13; hour++)
    {
      angle = hour * Math.PI / 6;
      this.renderer.rotate(angle);
      this.renderer.translate(0, -this.radius * 0.85);
      this.renderer.rotate(-angle);
      this.renderer.fillText(hour.toString(), 0, 0);
      this.renderer.rotate(angle);
      this.renderer.translate(0, this.radius * 0.85);
      this.renderer.rotate(-angle);
    }
  }

  private drawTime()
  {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    this.drawHand(hour, this.radius * 0.5, this.radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(minute, this.radius * 0.8, this.radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    this.drawHand(second, this.radius * 0.9, this.radius * 0.02);
  }

  private drawHand(pos, length, width) {
    this.renderer.beginPath();
    this.renderer.lineWidth = width;
    this.renderer.lineCap = "round";
    this.renderer.moveTo(0,0);
    this.renderer.rotate(pos);
    this.renderer.lineTo(0, -length);
    this.renderer.stroke();
    this.renderer.rotate(-pos);
  }

  render()
  {
    this.setScene();

    this.drawFace();
    this.drawFrame();
    this.drawCentre();
    this.drawNumbers();
    this.drawTime();

    this.resetScene();
  }
}
