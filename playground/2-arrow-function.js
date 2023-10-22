const eventList = {
    name: 'Birthday Party',
    guestList: ['cacat', 'maca', 'eeee'],
    printGuestList: function () {
        console.log(`guest list for ${this.name}`);
        console.log('guest list: ');
        this.guestList.forEach((guest) => console.log(guest + ` to ${this.name}`));
    },
};

eventList.printGuestList();