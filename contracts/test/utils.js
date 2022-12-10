async function shouldThrowError(promise) {
    try {
        await promise;
        assert(true);
    }
    catch (err) {
        return;
    }
    assert(false, 'The contract did not throw error');
};

module.exports = {
    shouldThrowError,
};
