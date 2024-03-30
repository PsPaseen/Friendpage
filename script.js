
// สุ่มเลข
function ramdomNUM() {
  const numFriends = Math.floor(Math.random() * 9) + 1;
  return numFriends;
}

// ตรวจเพื่อนว่าครบมั้ย
function checkNamesEntered() {
  const friendDivs = document.querySelectorAll('.friend');
  let allInputsEntered = true;
  friendDivs.forEach(friendDiv => {
    const nameInput = friendDiv.querySelector('input[type="text"]');
    const ageInput = friendDiv.querySelector('input[type="number"]');
    if (nameInput.value.trim() === '' || ageInput.value.trim() === '') {
      allInputsEntered = false;
    }
  });
  return allInputsEntered;
}

var numFriends;

//ดัก DOM Event โดยการใช้ addEventListener
generateFriends.addEventListener('click', function() {
  numFriends = ramdomNUM();
  // ลบกล่องเพื่อนเก่า (ถ้ามี)
  const oldFriendDivs = document.querySelectorAll('.friend');
  oldFriendDivs.forEach(friendDiv => friendDiv.remove());

  for (let i = 0; i < numFriends; i++) {
    const friendNumber = i + 1;

    const friendDiv = document.createElement('div');
    friendDiv.classList.add('friend');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', ` ชื่อเล่นของเพื่อนที่ ${friendNumber} `);
    nameInput.setAttribute('id', `name${friendNumber}`);
    friendDiv.appendChild(nameInput);

    const ageInput = document.createElement('input');
    ageInput.setAttribute('type', 'number');
    ageInput.setAttribute('placeholder', ` อายุของเพื่อนที่ ${friendNumber} `);
    ageInput.setAttribute('id', `age${friendNumber}`);
    friendDiv.appendChild(ageInput);

    document.body.appendChild(friendDiv);
  }
});

const resultsDiv = document.getElementById('resultsDiv');

//TotalAge
calculateTotalAge.addEventListener('click', function() {

  // หาจำนวนเพื่อนที่พิมลง
  const enteredNamesCount = checkNamesEntered();

  //ถ้าหากไม่ครบ ให้เด้งออก
  if (!enteredNamesCount) {
    alert('ได้โปรดใส่ให้เต็ม ขอบคุณครับ');
    return;
  }

  let totalAge = 0;
  const ageInputs = document.querySelectorAll('.friend input[type="number"]');
  ageInputs.forEach(input => {
    if (!isNaN(input.value)) {
      totalAge += parseInt(input.value);
    }
  });

  // แสดงผลลัพธ์
  resultsDiv.textContent = `จำนวนอายุเพื่อนทั้งหมด : ${totalAge}`;
});

//AvgAge
calculateAverageAge.addEventListener('click', function() {

// หาจำนวนเพื่อนที่พิมลง
const enteredNamesCount = checkNamesEntered();

//ถ้าหากไม่ครบ ให้เด้งออก
if (!enteredNamesCount) {
  alert('ได้โปรดใส่ให้เต็ม ขอบคุณครับ');
  return;
}

  let totalAge = 0;
  let validFriendCount = 0;

  const ageInputs = document.querySelectorAll('.friend input[type="number"]');
  ageInputs.forEach(input => {
    if (!isNaN(input.value)) {
      totalAge += parseInt(input.value);
      validFriendCount++;
    }
  });

  const averageAge = totalAge / validFriendCount;
  resultsDiv.textContent = `อายุเฉลี่ยของเพื่อนทั้งหมด : ${averageAge.toFixed(2)}`;
});

// คำนวณอายุของเพื่อนที่อายุน้อยที่สุด
calculateMinAge.addEventListener('click', function() {

  // หาจำนวนเพื่อนที่พิมลง
  const enteredNamesCount = checkNamesEntered();

  //ถ้าหากไม่ครบ ให้เด้งออก
  if (!enteredNamesCount) {
    alert('ได้โปรดใส่ให้เต็ม ขอบคุณครับ');
    return;
  }

  let minAge = Infinity;
  let youngestFriends = [];

  const friendDivs = document.querySelectorAll('.friend');
  friendDivs.forEach(friendDiv => {
    const nameInput = friendDiv.querySelector('input[type="text"]');
    const ageInput = friendDiv.querySelector('input[type="number"]');
    const age = parseInt(ageInput.value.trim());
    if (!isNaN(age)) {
      if (age < minAge) {
        minAge = age;
        youngestFriends = [{ name: nameInput.value.trim(), age: age }];
      } else if (age === minAge) {
        youngestFriends.push({ name: nameInput.value.trim(), age: age });
      }
    }
  });

  // แสดงผลลัพธ์
  if (youngestFriends.length === 0) {
    resultsDiv.textContent = "ข้อมูลไม่ถูกต้อง.";
  } else if (youngestFriends.length === 1) {
    resultsDiv.textContent = `เพื่อนชื่อ: ${youngestFriends[0].name} (อายุ: ${youngestFriends[0].age})`;
  } else {
    let message = "เพื่อนที่อายุน้อยที่สุดได้แก่... : ";
    youngestFriends.forEach((friend, index) => {
      message += `${friend.name} (Age: ${friend.age})`;
      if (index < youngestFriends.length - 1) {
        message += ", ";
      }
    });
    resultsDiv.textContent = message;
  }
});

// คำนวณอายุของเพื่อนที่มีอายุมากที่สุด
calculateMaxAge.addEventListener('click', function() {

  // หาจำนวนเพื่อนที่พิมลง
  const enteredNamesCount = checkNamesEntered();

  //ถ้าหากไม่ครบ ให้เด้งออก
  if (!enteredNamesCount) {
    alert('ได้โปรดใส่ให้เต็ม ขอบคุณครับ');
    return;
  }

  let maxAge = -Infinity;
  let oldestFriends = [];

  const friendDivs = document.querySelectorAll('.friend');
  friendDivs.forEach(friendDiv => {
    const nameInput = friendDiv.querySelector('input[type="text"]');
    const ageInput = friendDiv.querySelector('input[type="number"]');
    const age = parseInt(ageInput.value.trim());
    if (!isNaN(age)) {
      if (age > maxAge) {
        maxAge = age;
        oldestFriends = [{ name: nameInput.value.trim(), age: age }];
      } else if (age === maxAge) {
        oldestFriends.push({ name: nameInput.value.trim(), age: age });
      }
    }
  });

  // แสดงผลลัพธ์
  if (oldestFriends.length === 0) {
    resultsDiv.textContent = "ข้อมูลไม่ถูกต้อง.";
  } else if (oldestFriends.length === 1) {
    resultsDiv.textContent = `เพื่อนชื่อ: ${oldestFriends[0].name} (อายุ: ${oldestFriends[0].age})`;
  } else {
    let message = "เพื่อนที่อายุเยอะที่สุดได้แก่...: ";
    oldestFriends.forEach((friend, index) => {
      message += `${friend.name} (Age: ${friend.age})`;
      if (index < oldestFriends.length - 1) {
        message += ", ";
      }
    });
    resultsDiv.textContent = message;
  }
});

reset.addEventListener('click', resetAndGenerateNewFriends);

function resetAndGenerateNewFriends() {
  const oldFriendDivs = document.querySelectorAll('.friend');
  oldFriendDivs.forEach(friendDiv => friendDiv.remove());
  resultsDiv.textContent = '';
  generateFriends.click();
}


