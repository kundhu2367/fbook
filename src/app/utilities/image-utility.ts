import { Observable } from "rxjs";

export function ImageUtility(image: Blob): Observable<any> {
  return new Observable(observer => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      let imageToShow = reader.result;
      observer.next(imageToShow);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  })
}
