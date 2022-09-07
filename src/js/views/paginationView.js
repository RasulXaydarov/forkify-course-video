import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      // Pages and next page button

      return `<div class="pagination-container container-page--1"> ${this._generatePageButtons(
        numPages,
        curPage
      )}${this._generateMarkupButton(curPage + 1)} </div>`;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      // Pervious page button
      return `<div class="pagination-container"> ${this._generateMarkupButton(
        curPage - 1
      )} ${this._generatePageButtons(numPages)}</div>`;
    }
    // Other page

    if (curPage < numPages) {
      return `<div class="pagination-container">${this._generateMarkupButton(
        curPage - 1
      )}${this._generatePageButtons(numPages)}${this._generateMarkupButton(
        curPage + 1
      )}</div>`;
    }
    // Page 1, and there are NO other pages
    return '';
  }
  _generateMarkupButton(goToPageNum) {
    const curPage = this._data.page;

    return `
           <button data-goto="${goToPageNum}" class="btn--inline pagination__btn--${
      goToPageNum > curPage ? 'next' : 'prev'
    }">
           ${
             goToPageNum < curPage
               ? `<svg class="search__icon">
            <use href="${icons}#icon-arrow-${
                   goToPageNum < curPage ? 'left' : 'right'
                 }"</use>
          </svg>`
               : ''
           }
               <span>Page ${goToPageNum}</span>
               ${
                 goToPageNum > curPage
                   ? `<svg class="search__icon">
                 <use href="${icons}#icon-arrow-${
                       goToPageNum > curPage ? 'right' : 'left'
                     }"</use>
               </svg>`
                   : ''
               }
            
           </button>
      `;
  }

  // Generate buttons for each page

  _generatePageButtons(numPages, curPage) {
    let numArr = [];
    console.log(curPage);

    for (let a = 1; a < numPages; a++) {
      numArr.push(a);

      if (a === numPages - 2 && numPages > 5) {
        numArr.push(`<span>...</span>`);
      }
    }

    // Deleting numbers and span element from the array when the number of pages is long
    if (numArr.length > 5) {
      numArr.splice(-2, 2);
    }

    // numArr containes numbers for page buttons
    console.log(numArr);
    // Remove current page from the array, index is index of the current page
    let index = numArr.indexOf(curPage);
    numArr.splice(index, 1);

    return numArr
      .map(
        pageNum =>
          `<a href="#" data-goto="${pageNum}" class="btn-page btn--inline">${pageNum}</a>`
      )
      .join('');

    /*  <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Page 1</span>
  </button>
  <a href="#" class="btn--inline btn-page">2</a><a href="#" class="btn-page">3</a
  ><a href="#" class="btn--inline btn-page">4</a><span>...</span
  ><a href="#" class="btn--inline btn-page last-page">6</a>
  <button class="btn--inline pagination__btn--next">
    <span>Page 3</span>
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-right"></use>
    </svg>
  </button>*/
  }
}

export default new PaginationView();
