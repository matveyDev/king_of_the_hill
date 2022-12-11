def validate_address(address: str):
    if len(address) != 42:
        raise Exception('Address must have length equals 42')
