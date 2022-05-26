import View from './View.js';
import icons from '../../img/icons.svg'; // Parcel 2

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
    console.log(numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage + 1);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage - 1);
    }
    // Other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton(
        curPage - 1
      )} ${this._generateMarkupButton(curPage + 1)}`;
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
}

export default new PaginationView();
