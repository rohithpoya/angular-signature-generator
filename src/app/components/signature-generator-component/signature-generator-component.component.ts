import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signature-generator-component',
  templateUrl: './signature-generator-component.component.html',
  styleUrls: ['./signature-generator-component.component.scss']
})
export class SignatureGeneratorComponentComponent implements OnInit {
    @ViewChild("canvasEl") canvasEl: ElementRef;
    public base64Image = "";
    private context: CanvasRenderingContext2D | null = null;
    public currentIndex: number = -1;

    @Input() signatureText = 'mySignatureHere';
    @Input() dataSource: any[] = dataSource;
    @Input() imageHeight: string = "200";
    @Input() imageWidth: string = "600";
    @Input() showSignature: boolean = false;
    @Output() signatureAsBase64: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    ngOnInit(){}

    ngAfterViewInit() {}

    onSignatureSelection(data: styleInfo, index: number) {
      this.currentIndex = index;
      this.generateSignature(data.FontSize, data.FontFamily, data.FontWeight);
    }

    private generateSignature(fontSize: string, fontFamily: string, fontWeight: string) {
        this.context = (this.canvasEl
            .nativeElement as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
        this.context.font = ` ${fontSize} ${fontFamily}`;
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
        this.context.imageSmoothingQuality = "high";
        this.context.imageSmoothingEnabled = true;
        this.context.lineWidth = 15;
        this.context.fillStyle = "black";
        const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
        const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
        this.context.fillText(this.signatureText, x, y);
        if (this.context) {
            this.base64Image = (this.canvasEl
                .nativeElement as HTMLCanvasElement).toDataURL("image/png");
            const canvasWidth = (this.canvasEl.nativeElement as HTMLCanvasElement)
                .width;
            const canvasHeight = (this.canvasEl.nativeElement as HTMLCanvasElement)
                .height;
            this.context.clearRect(0, 0, canvasWidth, canvasHeight);
            this.signatureAsBase64.emit(this.base64Image);
        }
    }
}

export interface styleInfo{
  FontFamily: string,
  FontSize: string,
  FontWeight: string
}

const dataSource = [
    {
        FontFamily: "Sacramento",
        FontSize: "30px",
        FontWeight: "bold"
    },
    {
        FontFamily: "Satisfy",
        FontSize: "30px",
        FontWeight: "bold"
    },
    {
        FontFamily: "Pacifico",
        FontSize: "30px",
        FontWeight: "bold"
    },
    {
        FontFamily: "Gloria Hallelujah",
        FontSize: "30px",
        FontWeight: "bold"
    },
    {
        FontFamily: "Lobster",
        FontSize: "30px",
        FontWeight: "bold"
    },
    {
        FontFamily: "Dancing Script",
        FontSize: "30px",
        FontWeight: "bold"
    },
];

