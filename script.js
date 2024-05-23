// Fetch JSON data
fetch('kpopIdols.json')
  .then(response => response.json())
  .then(data => {
    // Store the fetched data in a variable
    const kpopIdols = data;

    // Define your functions here

    // Search group and show its members
    function searchGroup(e) {
      e.preventDefault();

      // Clear single idol
      single_idolEl.innerHTML = '';

      // Get search term
      const term = search.value.trim();

      // Check for empty
      if (term) {
        const group = kpopIdols.groups.find(group => group.name.toLowerCase() === term.toLowerCase());
        if (group) {
          resultHeading.innerHTML = `<h2>${group.name}</h2> 
          <img src="${group.image}" alt='bts' style="width:30%; height: 50%;"/>
          <p><strong>Company:</strong> ${group.company}</p> 
          <p><strong>Debut:</strong> ${group.debut}</p>
          <p><strong>Albums:</strong> ${group.albums.join(', ')}</p> 
          <iframe width="400" height="250" src="${group.groupVideo}" frameborder="0" allowfullscreen></iframe>`;    
          showMembers(group.members);
        } else {
          resultHeading.innerHTML = `<h2>Group with name '${term}' not found</h2>`;
        }
      } else {
        alert('Please enter a group name to search');
      }
    }

    // Show Members
    function showMembers(members) {
      idolsEl.innerHTML = members.map(member => `
        <div class="idol">
          <img src="${member.image}" alt="${member.name}" />
          <div class="idol-info" data-member="${member.name}">
            <h3>${member.name}</h3>
          </div>
        </div>
      `).join('');
    }

    // Show Single Member
    function showSingleMember(memberName) {
      const group = kpopIdols.groups.find(group => group.members.some(member => member.name === memberName));
      const member = group.members.find(member => member.name === memberName);

      resultHeading.innerHTML = `<h2>${member.name}</h2> `;
      single_idolEl.innerHTML = `
        <div class="single-idol">
          <h3>${member.name}</h3>
          <img src="${member.image}" alt="${member.name}" />
          <p><strong>Group:</strong> ${member.groupName}</p>
          <p><strong>Position:</strong> ${member.position}</p>
          <p><strong>Age:</strong> ${member.age}</p>
          <iframe width="400" height="250" src="${member.video}" frameborder="0" allowfullscreen></iframe>
          <p><strong>History:</strong></p>
          <p>${member.history}</p>
        </div>
      `;
    }

    // Show Random Member
    function showRandomMember() {
      // Clear previous results
      resultHeading.innerHTML = '';
      idolsEl.innerHTML = '';
      single_idolEl.innerHTML = '';

      const randomGroup = kpopIdols.groups[Math.floor(Math.random() * kpopIdols.groups.length)];
      const randomMember = randomGroup.members[Math.floor(Math.random() * randomGroup.members.length)];
      
      resultHeading.innerHTML = `<h2>Random Member</h2>`;
      single_idolEl.innerHTML = `
        <div class="single-idol">
          <h3>${randomMember.name}</h3>
          <img src="${randomMember.image}" alt="${randomMember.name}" />
          <p><strong>Group:</strong> ${randomMember.groupName}</p>
          <p><strong>Position:</strong> ${randomMember.position}</p>
          <p><strong>Age:</strong> ${randomMember.age}</p>
          <iframe width="400" height="250" src="${randomMember.video}" frameborder="0" allowfullscreen></iframe>
          <p><strong>History:</strong></p>
          <p>${randomMember.history}</p>
        </div>
      `;
    }

    // Event Listeners
    submit.addEventListener('click', searchGroup); // Changed 'submit' to 'click' event
    randomGroupImg.addEventListener('click', showRandomMember); // Corrected the event listener name

    idolsEl.addEventListener('click', e => {
      const memberInfo = e.target.closest('.idol-info');
      if (memberInfo) {
        const memberName = memberInfo.getAttribute('data-member');
        showSingleMember(memberName);
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
