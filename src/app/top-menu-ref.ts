import { OverlayRef } from '@angular/cdk/overlay';

export class TopMenuRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
