import { InvalidMetadataNameException } from 'src/engine/metadata-modules/utils/exceptions/invalid-metadata-name.exception';

const STARTS_WITH_LOWER_CASE_AND_CONTAINS_ONLY_CAPS_AND_LOWER_LETTERS_AND_NUMBER_STRING_REGEX =
  /^[a-z][a-zA-Z0-9]*$/;

export const validateMetadataNameStartWithLowercaseLetterAndContainDigitsNorLettersOrThrow =
  (name: string) => {
    if (
      !name.match(
        STARTS_WITH_LOWER_CASE_AND_CONTAINS_ONLY_CAPS_AND_LOWER_LETTERS_AND_NUMBER_STRING_REGEX,
      )
    ) {
      throw new InvalidMetadataNameException(
        `String "${name}" is not valid: must start with lowercase letter and contain only alphanumeric letters`,
      );
    }
  };
