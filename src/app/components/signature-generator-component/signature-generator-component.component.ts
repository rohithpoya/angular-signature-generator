import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';

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

    download(){
        let file = this.convertBase64ToFile(this.base64Image, 'signature.png');
        saveAs(file, 'signature.png');
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

    convertBase64ToFile(base64String: string, fileName : string){
        let arr = base64String.split(',');
        let mime = 'image/png';
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let uint8Array = new Uint8Array(n);
        while (n--) {
           uint8Array[n] = bstr.charCodeAt(n);
        }
        let file = new File([uint8Array], fileName, { type: mime });
        return file;
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

