const getState = ({ getStore, getActions, setStore }) => {
	return {
			store: {
				contacts: [],
				userToEdit: {},
				editing: false
			},
		actions: {
			getContacts: () => {
				fetch('https://playground.4geeks.com/contact/agendas/benja/contacts')
				.then( (response) => response.json())
				.then( data => setStore({ contacts: data.contacts }))	
			},

			createContact: (name, phone, email, address) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"name": name,
						"phone": phone,
						"email": email,
						"address": address
					 })
				};
				fetch('https://playground.4geeks.com/contact/agendas/benja/contacts', requestOptions)
					.then(response => response.json())
					.then(() => getActions().getContacts())
			.catch(error => console.error('Hubo un error al realizar la solicitud:', error));
			},

			deleteContact: (iDToDelete) => {
				fetch(`https://playground.4geeks.com/contact/agendas/benja/contacts/${iDToDelete}`, { method: 'DELETE' })
				.then( () => getActions().getContacts())
			},

			setEditing: (value) => {
				setStore({ editing: value });
			  },

			  modifyContacts: (iDSelected) => {
				const userSelected = getStore().contacts.find(user => user.id === iDSelected)
				setStore({ userToModify: userSelected })
				setStore({editing: true })
			},
			modifyContactAPI: (name, phone, email, address, iDToEdit) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"name": name,
						"phone": phone,
						"email": email,
						"address": address
					 })
				};
				fetch(`https://playground.4geeks.com/contact/agendas/benja/contacts/${iDToEdit}`, requestOptions)
					.then(response => response.json())
					.then( setStore({ userToModify: {} }))
					.then(() => getActions().getContacts())
			},
			searchMyUser : () => {
				fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100")
				.then( (response) => response.json())
				.then( data => {
					const myUser = data.agendas.find (user => user.slug === "benja")
					if(!myUser) {
							fetch(`"https://playground.4geeks.com/contact/agendas/benja"`, { method: 'POST' })
							.then((response) => response.json())
							.then( () => getActions().getContacts())}
				})
			},

			loadSomeData: () => {

				getActions().searchMyUser()
				getActions().getContacts();
				console.log(getStore().contacts)
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
		}
	};
};

export default getState;