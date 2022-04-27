const cases = document.querySelectorAll('.p');
const score = document.getElementById('score');

particlesJS.load('particles-js', 'src/particles.json');
const restartBtn = document.getElementsByClassName('replay')[0];

restartBtn.addEventListener('click', () => {
  cases.forEach((caseItem, i) => {
    caseItem.classList.remove('animate__zoomIn');
    caseItem.classList.add('animate__zoomOut');
  });

  setTimeout(() => {
    location.reload();
  }, 1000);
});

setTimeout(() => {
  cases.forEach((caseItem, i) => {
    caseItem.classList.remove('animate__zoomIn');
  });
}, 1000);

let scoreNum = 0;

const cantLeft = [0, 3, 6, 9, 12, 15, 36, 39, 42];
const cantUp = [0, 1, 2, 9, 10, 11, 27, 28, 29];
const cantDown = [15, 16, 17, 42, 43, 44, 33, 34, 35];
const cantRight = [2, 5, 8, 29, 32, 35, 38, 41, 44];

const b1 = [6, 7, 8, 24, 25, 26];
const b2 = [18, 19, 20, 36, 37, 38];
const b3 = [11, 14, 17, 20, 23, 26];
const b4 = [18, 21, 24, 27, 30, 33];

let origins;
let firstClick = false;

cases.forEach((caseItem, i) => {

  makeActive(i);

  caseItem.addEventListener('click', () => {
    const {upCase, downCase, leftCase, rightCase} = getCases(i);
    const {UpUpCase, DownDownCase, LeftLeftCase, RightRightCase} = getCasesAfter(i);

    if (!firstClick) {
      firstClick = true;
      score.innerText = "SCORE : 0";
      makeCase(i);
    } else {
      if (caseItem.classList.contains('case-posable')) {
        makeActive(i);
        scoreNum++;
        score.innerText = `SCORE : ${scoreNum}`;
        if (origins) {
          origins.forEach(origin => {
            makeCase(origin);
          });
        }
        cases.forEach((caseItem, i) => {
          if (caseItem.classList.contains('case-posable')) {
            makeCase(i);
          }
        });
        origins = [];

      } else {
        cases.forEach((caseItem, i) => {
          if (caseItem.classList.contains('case-posable')) {
            makeCase(i);
          }

          if (caseItem.classList.contains('breath')) {
            makeActive(i);
          }
        });

        if (caseItem.classList.contains('case-active')) makeVeryActive(i);

        if ((caseItem.classList.contains('case-active') || caseItem.classList.contains('breath')) && (upCase !== false) && cases[upCase].classList.contains('case-active') && (UpUpCase !== false) && cases[UpUpCase].classList.contains('case')) {
          origins = [i, upCase];
          makePosable(UpUpCase);
        }

        if ((caseItem.classList.contains('case-active') || caseItem.classList.contains('breath')) && (downCase !== false) && cases[downCase].classList.contains('case-active') && (DownDownCase !== false) && cases[DownDownCase].classList.contains('case')) {
          origins = [i, downCase];
          makePosable(DownDownCase);
        }

        if ((caseItem.classList.contains('case-active') || caseItem.classList.contains('breath')) && (leftCase !== false) && cases[leftCase].classList.contains('case-active') && (LeftLeftCase !== false) && cases[LeftLeftCase].classList.contains('case')) {
          origins = [i, leftCase];
          makePosable(LeftLeftCase);
        }

        if ((caseItem.classList.contains('case-active') || caseItem.classList.contains('breath')) && (rightCase !== false) && cases[rightCase].classList.contains('case-active') && (RightRightCase !== false) && cases[RightRightCase].classList.contains('case')) {
          origins = [i, rightCase];
          makePosable(RightRightCase);
        }
      }
    }
  });
});

function makeActive(i) {
  cases[i].classList.remove('case');
  cases[i].classList.remove('case-posable');
  cases[i].classList.remove('breath');
  cases[i].classList.add('case-active');
}

function makePosable(i) {
  cases[i].classList.remove('case');
  cases[i].classList.remove('case-active');
  cases[i].classList.remove('breath');
  cases[i].classList.add('case-posable');
}

function makeCase(i) {
  cases[i].classList.remove('case-active');
  cases[i].classList.remove('case-posable');
  cases[i].classList.remove('breath');
  cases[i].classList.add('case');
}

function makeVeryActive(i) {
  cases[i].classList.remove('case-active');
  cases[i].classList.remove('case-posable');
  cases[i].classList.remove('case');
  cases[i].classList.add('breath');
}

function getCases(i) {
  let upCase = i - 3;
  let downCase = i + 3;
  let leftCase = i - 1;
  let rightCase = i + 1;

  if (b1.includes(i)) {
    downCase = i + 12;
  }

  if (b2.includes(i)) {
    upCase = i - 12;
  }

  if (b3.includes(i)) {
    rightCase = i + 7;
  }

  if (b4.includes(i)) {
    leftCase = i - 7;
  }

  if (cantLeft.includes(i)) {
    leftCase = false;
  }

  if (cantUp.includes(i)) {
    upCase = false;
  }

  if (cantDown.includes(i)) {
    downCase = false;
  }

  if (cantRight.includes(i)) {
    rightCase = false;
  }

  return {
    upCase,
    downCase,
    leftCase,
    rightCase
  };
}

function getCasesAfter(i) {
  const {upCase, downCase, leftCase, rightCase} = getCases(i);
  const UpUpCase = upCase ? getCases(upCase).upCase : false;
  const DownDownCase = downCase ? getCases(downCase).downCase : false;
  const LeftLeftCase = leftCase ? getCases(leftCase).leftCase : false;
  const RightRightCase = rightCase ? getCases(rightCase).rightCase : false;
  return {
    UpUpCase,
    DownDownCase,
    LeftLeftCase,
    RightRightCase
  };
}

function getHelp() {
  Swal.fire({
    title: 'Règle du jeu',
    html: `<p>Au début de la partie, vous devez retirer un pion. Le but est de retirer tout les pions du plateau. Pour supprimer des pions, il faut que deux pions soient adjacents et suivis d'une case vide. Le premier pion « saute » par-dessus le deuxième et rejoint la case vide. Le deuxième pion est alors retiré du plateau. Un pion ne peut sauter qu'horizontalement ou verticalement, et un seul pion à la fois.</p>`,
  })
}
