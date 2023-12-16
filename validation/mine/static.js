{

const stringRequiredMin = {
    max: stringRequiredMax,
}

const stringRequiredMax = {
    min: stringRequiredMin,
}

const stringRequired = {
    min: stringRequiredMin,
    max: stringRequiredMax,
}

const string = {
    required: stringRequired,
}

string.required

}
