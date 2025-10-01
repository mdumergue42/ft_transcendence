export class Graph
{
	canvas:HTMLCanvasElement;
	context:CanvasRenderingContext2D;
	w:number;
	h:number;
	constructor(canvas: HTMLCanvasElement)
	{
		this.canvas = canvas;
		this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
		this.w = canvas.width;
		this.h = canvas.height;
	}

    line(legends: string, ...values: number[])
    {
        var yValues = Array.from(values);
        const marginW = this.w / yValues.length / 2;
        const marginH = this.h * 0.05;

        var lastx = -1;
        var lasty = NaN;

        this.context.fillStyle = "white";
        this.context.strokeStyle = "red";
        for (let index = 0; index < yValues.length; index++)
        {
            this.context.beginPath();
            const yh = (1 - yValues[index]) * this.h * 0.8 + marginH;
            const xw = index / yValues.length * this.w + marginW;
            this.context.arc(xw, yh, 5, 0, Math.PI * 2, false);
            this.context.fill();

            if (lastx != -1)
            {
                this.context.beginPath();
                this.context.moveTo(lastx, lasty);
                this.context.lineTo(xw, yh);
                this.context.stroke();
                
            }
            lastx = xw;
            lasty = yh;
        }
        this.context.font= '15px Verdana';
        this.context.fillText(legends, this.w * 0.2, this.h * 0.95);
    }

	bar(legends: string, ...values: number[])
    {
        var yValues = Array.from(values);
        const marginH = this.h * 0.15;

        this.context.fillStyle = "white";

        const barWidth = (this.w) * 0.8 / yValues.length;
        const barSpacing = (this.w) * 0.2 / yValues.length;
        const maxValue = Math.max(...yValues);

        yValues.forEach((value:number, index:number) =>
        {
            value = Math.max(0.01, value);
            const barHeight = (value / maxValue) * (this.h - marginH * 2);
            this.context.fillRect(index * (barWidth + barSpacing),
                this.h - barHeight - marginH, barWidth, barHeight);
        });
        this.context.font= '15px Verdana';
        this.context.fillText(legends, this.w * 0.2, this.h * 0.95);
    }

    pie(legends: string, ...values: number[])
    {
        const drawRotatingArc = (centerX:number, centerY:number, phi:number, radius:number, theta:number, color:string) =>
        {
            this.context.save();
            this.context.translate(centerX, centerY);
            this.context.rotate(phi);
            this.context.beginPath();
            this.context.arc(0, 0, radius, 0, theta);
            this.context.strokeStyle = color;
            this.context.lineWidth = 5;
            this.context.stroke();
            this.context.restore();
        };
        var yValues = Array.from(values);
        var colors = ["red", "blue", "green", "purple"];

        const centerh = this.h / 2;
        const centerw = this.w / 2;
        var totalRotate = 0;
		var splitLegends = legends.split(" ")
        for (let index = 0; index < yValues.length; index++)
        {
            const theta = Math.PI * 2 * yValues[index]
            drawRotatingArc(centerw, centerh, totalRotate, 50, theta, colors[index % 4]);
            totalRotate += theta;
			this.context.font= '15px Verdana';
			this.context.fillStyle = colors[index % 4];
			this.context.fillText(splitLegends[index], this.w * 0.2, this.h * (0.95 - 0.1 * index));
        }
    }
}
