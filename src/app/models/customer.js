class Customer {
    constructor(
        name,
        address,
        nit,
        contact,
        phone,
        vendors_idvendor,
        branch_idbranch
    ) {
        this.name = name
        this.address = address
        this.nit = nit
        this.contact = contact
        this.phone = phone
        this.vendors_idvendor = vendors_idvendor
        this.branch_idbranch = branch_idbranch
    }
}

module.exports = Customer