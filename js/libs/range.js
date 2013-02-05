function normalize(value, minimum, maximum)
{
    return (value - minimum) / (maximum - minimum);
}

function interpolate(value, minimum, maximum)
{
    return minimum + (maximum - minimum) * value;
}

function map(value, min1, max1, min2, max2)
{
    return interpolate(normalize(value, min1, max1), min2, max2);
}