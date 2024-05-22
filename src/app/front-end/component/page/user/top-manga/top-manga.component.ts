import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'app-top-manga',
  templateUrl: './top-manga.component.html',
  styleUrls: ['./top-manga.component.scss']
})
export class TopMangaComponent implements AfterViewInit{

  protected heightMangaTop: string = '0'

  @ViewChild('top_manga')
  protected topMangaElement: ElementRef


  constructor(topMangaElement: ElementRef) {
    this.topMangaElement = topMangaElement
  }

  @HostListener('window:resize', ['$event'])
  async onResize() {
    this.heightMangaTop = `${this.topMangaElement.nativeElement.offsetWidth / 3}px`
  }

  async ngAfterViewInit(): Promise<void> {
    await this.onResize()
  }
}
