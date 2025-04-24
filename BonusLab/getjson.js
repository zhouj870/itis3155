'use strict';

const container = document.getElementById('team');

async function getStaff(){
	try {
		const response = await fetch('team.json');
		if(!response.ok)
			throw Error(`Error: ${response.url} ${response.statusText}`);
		const data = await response.json();
		if(data.teammembers && data.teammembers.length > 0){
		showStaff(data);
		}
	} catch (error) {
		console.log(error.message);
	}
	
}

getStaff();

function showStaff(data){
	container.innerHTML = '';
	data.teammembers.forEach(member=>{

		const article = document.createElement('div');
    	article.classList.add('card');

		const image = document.createElement('img');
		image.src = member.image;
		image.alt = `${member.full_name}'s photo`;
		article.appendChild(image);

		const content = document.createElement('div');
		content.classList.add('content');

		const full_name = document.createElement('h3');
		full_name.textContent = member.full_name;
		content.appendChild(full_name);

		const title = document.createElement('h3');
		title.textContent = member.title;
		content.appendChild(title);

		const tag_line = document.createElement('p');
		tag_line.textContent = member.tag_line;
		content.appendChild(tag_line);

		article.appendChild(content);
		container.appendChild(article);
	});
	
}







