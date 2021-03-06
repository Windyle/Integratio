module.exports = {
  inheritedColumns: {
    "ae0e45ca-c495-4fe7-a39d-3ab7278e1617": { name: "Id", type: "uuid" },
    "7c81a01e-f59b-47df-830c-8e830f1bf889": { name: "Name", type: "text250" },
    "7c85a229-8cfa-4c29-8ab9-9463560a92ec": { name: "Owner", type: "lookup" },
    "e80190a5-03b2-4095-90f7-a193a960adee": { name: "CreatedOn", type: "dateTime" },
    "ebf6bb93-8aa6-4a01-900d-c6ea67affe21": { name: "CreatedBy", type: "lookup" },
    "9928edec-4272-425a-93bb-48743fee4b04": { name: "ModifiedOn", type: "dateTime" },
    "3015559e-cbc6-406a-88af-07f7930be832": { name: "ModifiedBy", type: "lookup" },
    "3fabd836-6a53-4d8d-9069-6df88d9dae1e": { name: "ProcessListeners", type: "numInteger" },
    "dedb8f3b-4cb0-46ec-99e8-483ab92e10bb": { name: "Ownership", type: "lookup" },
    "165072a8-b718-4490-ab89-223f30390d81": { name: "PrimaryContact", type: "lookup" },
    "f25a5087-fab6-4c7a-9cd0-177325f6e715": { name: "Parent", type: "lookup" },
    "d7da954f-d0d8-4eca-a2b4-7d4f7121f6b4": { name: "Industry", type: "lookup" },
    "60cc5643-4ee2-4adf-b76b-06000ad0b067": { name: "Code", type: "text250" },
    "d60a9c06-1170-4cd6-9dc1-c972bc451533": { name: "Type", type: "lookup" },
    "9dbe8164-58b4-42c9-a75e-7c568d430d50": { name: "Phone", type: "text250" },
    "9411651f-b785-4920-a542-e8ac11d2cf8d": { name: "AdditionalPhone", type: "text250" },
    "40bf89ca-5927-47a6-b3fe-8955deb5f3ce": { name: "Fax", type: "text250" },
    "a1d2ad98-d068-4fc2-8454-8a7c944cd0a1": { name: "Web", type: "text250" },
    "9f5af167-9ab8-4c83-99db-7503df0eb650": { name: "AddressType", type: "lookup" },
    "8cfabb54-64ca-413d-a4e0-81ce9d2f0c8f": { name: "Address", type: "textInf" },
    "13bbd624-a13b-4bc2-b05c-fff21e9f7b92": { name: "City", type: "lookup" },
    "8f532bba-53fb-4f56-babd-38402cb57b2a": { name: "Region", type: "lookup" },
    "3fe38c61-ff55-4012-b28d-67e59d5b1986": { name: "Zip", type: "text50" },
    "2a7c00bd-0519-4742-b905-d8ce5f1b70ca": { name: "Country", type: "lookup" },
    "0039b8f7-f5cf-44c9-8828-4b9cb2fd6634": { name: "AccountCategory", type: "lookup" },
    "8696b76a-1f0b-42a4-8279-934399c0207f": { name: "EmployeesNumber", type: "lookup" },
    "a006d013-4ef6-47a1-a000-d25346fcb392": { name: "AnnualRevenue", type: "lookup" },
    "0136fb47-c018-4b7f-8ed3-0eb6bd686b20": { name: "Notes", type: "textInf" },
    "c8abae85-5c2e-45bc-826b-fd53a88660c8": { name: "Logo", type: "image" },
    "e36ae687-347d-4bf7-b260-90129862e357": { name: "AlternativeName", type: "text250" },
    "f1f01f71-ddef-48bb-bc88-0fd2f3526ad9": { name: "GPSN", type: "text50" },
    "2ce4d59d-2ae4-4840-b4a7-33eee33fdb60": { name: "GPSE", type: "text50" },
    "fa768c13-2032-4055-9f11-4f0607f993b3": { name: "PriceList", type: "lookup" },
    "27a77271-50e0-436f-a559-38ce3f8f7f37": { name: "AccountLogo", type: "imageLink" },
    "a4362aa9-f7a2-4491-9072-a8cc46aaa42c": { name: "AUM", type: "text" },
    "58210e36-46cd-4a12-934c-c97e96ed4160": { name: "Completeness", type: "numInteger" },
    "736c30a7-c0ec-4fa9-b034-2552b319b633": { name: "Name", type: "text250" },
    "9e53fd7c-dde4-4502-a64c-b9e34148108b": { name: "Description", type: "text250" },
    "4dcf0a31-7fd7-4dba-a004-e413b1753431": { name: "Title", type: "text500" },
    "a12ca538-61b1-4907-9fdf-01969163d4dd": { name: "StartDate", type: "dateTime" },
    "4038ce1f-15b2-4630-abb6-0c7377ab4c9b": { name: "DueDate", type: "dateTime" },
    "4248a634-bad1-4a20-a6af-4cd85fd24630": { name: "Priority", type: "lookup" },
    "60c813ae-ce04-4c50-9049-affa1ce6e7b8": { name: "Author", type: "lookup" },
    "0d677c6b-95fd-47e2-a8b1-eadea6767eff": { name: "RemindToAuthor", type: "boolean" },
    "69e70c11-5851-467a-b74b-15d3505e4f57": { name: "RemindToAuthorDate", type: "dateTime" },
    "f0736fa3-79d1-4760-ae69-96ec56993491": { name: "Owner", type: "lookup" },
    "de2d9c7f-a8b4-4f28-85d3-ee2593ac0f00": { name: "RemindToOwner", type: "boolean" },
    "9917a146-aa6a-46d0-bd35-a9356c4d4992": { name: "RemindToOwnerDate", type: "dateTime" },
    "5491c33f-e927-4ca8-a579-d4810ea54c56": { name: "Type", type: "lookup" },
    "c814fa71-e01b-4325-ac8d-8d4a293ed138": { name: "ActivityCategory", type: "lookup" },
    "ff2dec51-885c-428a-8e6a-80c0c14b1434": { name: "ShowInScheduler", type: "boolean" },
    "c8d84f9c-b48b-479b-9ac6-4412f3436ca2": { name: "Status", type: "lookup" },
    "ae372cfa-a21f-47f0-8a64-17d137ebe966": { name: "Result", type: "lookup" },
    "070b689f-c9d8-46e3-bb52-bcb1f430f5cf": { name: "DetailedResult", type: "textInf" },
    "06ff3e76-36f0-44d2-8f07-ffb752ffde09": { name: "TimeZone", type: "lookup" },
    "fb0d6fd1-17a1-4a04-a155-a4b643c6d048": { name: "Account", type: "lookup" },
    "bfaa9c7f-c368-4402-8310-a17660faf148": { name: "Contact", type: "lookup" },
    "4684d4ba-4b6b-4d1a-93fb-70ec2afed57f": { name: "Opportunity", type: "lookup" },
    "52b16ed8-6a96-4c0d-9887-4ba8cbb953e9": { name: "Sender", type: "text250" },
    "0cb5732f-80c0-41ab-a51a-8a509143a98b": { name: "Recepient", type: "textInf" },
    "b2e5a95e-72e6-4985-b9b2-af1c335ed333": { name: "CopyRecepient", type: "textInf" },
    "a1502eb1-c06a-4e2e-8010-f51eed7315d4": { name: "BlindCopyRecepient", type: "textInf" },
    "618e7503-83b1-452d-aa33-8f76792853b5": { name: "Body", type: "textInf" },
    "961b5183-9eff-4424-b7f8-ee5267b489b6": { name: "Notes", type: "textInf" },
    "b5b47ef8-e084-4cb0-bf59-19b3199014c7": { name: "Color", type: "color" },
    "6689a019-c904-4b25-a89d-d17f3f3767cc": { name: "SendDate", type: "dateTime" },
    "4935a122-b7bc-443c-a282-72bd82f76ec4": { name: "EmailSendStatus", type: "lookup" },
    "dd115e6f-5443-4238-97d5-3f9c36d8a9db": { name: "DurationInMinutes", type: "numInteger" },
    "5ff0586c-bedc-4c23-84f3-086402411dbb": { name: "ErrorOnSend", type: "text500" },
    "487c8731-254d-4f2d-b152-9d823db2fc51": { name: "DurationInMnutesAndHours", type: "text50" },
    "7bb00970-c11a-4a5a-82e5-d0a613afde06": { name: "AllowedResult", type: "textInf" },
    "c7636768-5007-4cb9-800f-0d729fcadf4f": { name: "CreatedByInvCRM", type: "boolean" },
    "d6e94162-4354-413a-bc84-e118df5e852e": { name: "Lead", type: "lookup" },
    "af5a73d3-20ec-4419-819b-1575ce196bd2": { name: "MessageType", type: "lookup" },
    "80fd1395-7e28-485e-a566-82fa964ba80b": { name: "IsHtmlBody", type: "boolean" },
    "1c19adcd-d3b5-4403-b515-b5c2cc9e481c": { name: "MailHash", type: "text50" },
    "ee2173fc-0840-4735-8c14-b58b6e3d9b99": { name: "ProcessElementId", type: "uuid" },
    "d480d73a-f329-47f2-a0a2-cac4e82a2a40": { name: "GlobalActivityID", type: "text250" },
    "024c7e3b-9ce7-4ec6-aaf5-bdedd07ac300": { name: "UserEmailAddress", type: "text250" },
    "8b9e6930-54d2-4533-ab94-865a0c5d7db7": { name: "Contract", type: "lookup" },
    "8da997ed-5182-472b-8818-6d146ca6b156": { name: "Invoice", type: "lookup" },
    "e2d77c79-645a-450c-b4bd-0bbf55588489": { name: "Project", type: "lookup" },
    "a07b44ec-9d82-4c14-a5a6-a7bc4a1c9354": { name: "FullProjectName", type: "textInf" },
    "e6098162-2f14-42af-833f-a83c8ce8e78c": { name: "Order", type: "lookup" },
    "47c4dc47-8529-4d0e-a6fa-f298bb20cd13": { name: "Case", type: "lookup" },
    "555043b5-fac8-41b9-9bb2-3703acb0f447": { name: "Change", type: "lookup" },
    "08f8ebb0-377f-4cfb-b56a-98c917ff81a0": { name: "Release", type: "lookup" },
    "004b1104-cc46-4865-b079-f23d2665c922": { name: "IsNeedProcess", type: "boolean" },
    "2bbd4d7c-2727-47d6-bde1-311fdbbbb97e": { name: "ActivityConnection", type: "lookup" },
    "a25b00d4-25cc-4dcb-acce-c3af16d60e06": { name: "Problem", type: "lookup" },
    "734dfca1-2478-4719-8f3c-bfe3c6d1813d": { name: "Organizer", type: "lookup" },
    "be1d624b-b774-40ab-85cc-9364dacd6199": { name: "Location", type: "text500" },
    "e0bdcc85-3918-4a9e-9589-de3ec07120ec": { name: "ConfItem", type: "lookup" },
    "fe3732e9-7b58-4e30-afc3-b121bba13a8c": { name: "IsNotPublished", type: "boolean" },
    "a3d9fc18-5ad2-486f-9efd-be29f0d4429a": { name: "CallDirection", type: "lookup" },
    "00c2b73d-e1eb-4097-ab86-663735696f9b": { name: "Event", type: "lookup" },
    "f6137557-741e-42f8-8bf6-69b2524a83f7": { name: "Document", type: "lookup" },
    "8235b9b7-a369-44f2-98e4-aa7d291da2c9": { name: "QueueItem", type: "lookup" },
    "3f1f6edd-5b9c-45d5-9575-edcf22c54893": { name: "HeaderProperties", type: "textInf" },
    "ace5b35d-0166-48ca-b2d4-20add837dbbd": { name: "EnrchEmailData", type: "lookup" },
    "1c44eeca-97e9-4a02-a9a7-fff0eb8a4afb": { name: "EnrichStatus", type: "text50" },
    "1b3d86ae-616d-49c5-b738-63b2a25c9607": { name: "ServiceProcessed", type: "boolean" },
    "7737db5f-7bab-4188-9d8e-a89636a84370": { name: "IsAutoSubmitted", type: "boolean" },
    "67551707-45c4-4d2b-a77b-683eb8aa5fe1": { name: "SenderContact", type: "lookup" },
    "6bb4799d-c450-4d98-ae51-a92e9689c358": { name: "Preview", type: "text250" },
    "e4eae837-3880-4fb6-b3d9-1e07e1412230": { name: "OmniChat", type: "lookup" },
    "44967d0f-c9bf-4baa-2759-11e670e86cc3": { name: "OwnerRole", type: "lookup" },
    "3a15a3c6-e7e4-06da-c667-5561e5f9cd1d": { name: "RemoteCreatedOn", type: "dateTime" },
    "7421096a-1fe8-477b-b718-8d66554c0f97": { name: "ForContact", type: "boolean" },
    "4c02f622-12ca-4649-a1bf-17cf7a94b168": { name: "ForAccount", type: "boolean" },
    "7b8ce6b4-29ca-40c7-bea1-b5bf7b7c404a": { name: "Number", type: "text50" },
    "c91a9a6f-008d-4b2e-83d5-03868ad68c99": { name: "RegisteredOn", type: "dateTime" },
    "ffe8526d-044f-4222-a1ef-fca83a0772d8": { name: "Subject", type: "text500" },
    "6f9b3e63-5998-4c16-b1b0-cd712516ad18": { name: "Symptoms", type: "textInf" },
    "70620d00-e4ea-48d1-9fdc-4572fcd8d41b": { name: "Owner", type: "lookup" },
    "25280121-c075-441f-b4f8-feeb6cc7ca38": { name: "ResponseDate", type: "dateTime" },
    "624839d1-3bd0-45e0-95d1-28326703f19c": { name: "SolutionDate", type: "dateTime" },
    "a71adaea-3464-4dee-bb4f-c7a535450ad7": { name: "Status", type: "lookup" },
    "4bc0db67-0abe-4fbd-a70a-54d0bee0c42d": { name: "Notes", type: "textInf" },
    "6a2e8ee8-f1cb-45ad-a731-6b082109d507": { name: "Priority", type: "lookup" },
    "a93cb111-ce30-4da4-89ec-d2a2f3dd71c4": { name: "Origin", type: "lookup" },
    "b15302c9-b5c4-4d94-afd5-3d409f9adfe1": { name: "Account", type: "lookup" },
    "6396f46e-c49f-4fb1-850d-824869ff04b3": { name: "Contact", type: "lookup" },
    "9147230c-ab53-4eb4-b0b4-ac78be6f8326": { name: "Group", type: "lookup" },
    "02612dc8-7243-4acb-b0bd-abbd19e24136": { name: "RespondedOn", type: "dateTime" },
    "81552f0a-fd92-4865-9533-f4c3ab2861a7": { name: "SolutionProvidedOn", type: "dateTime" },
    "e12191ff-2811-430d-aeca-7a4435e4b1b9": { name: "ClosureDate", type: "dateTime" },
    "d2fb7a30-8a2e-462b-963a-b88ff1f52f0e": { name: "ClosureCode", type: "lookup" },
    "aafda194-dbd6-4337-923a-b19a456eeea9": { name: "Solution", type: "textInf" },
    "ccfc5fbf-4dc9-47e4-91f3-54ea9251ab18": { name: "SatisfactionLevel", type: "lookup" },
    "af280321-e749-41dd-98e5-383906747e29": { name: "Category", type: "lookup" },
    "1ed4e080-0bf8-4f4f-97e8-b3e22f3240a0": { name: "ResponseOverdue", type: "boolean" },
    "0fa66efc-d2d0-47b9-abab-9e3ad2ea82d3": { name: "SolutionOverdue", type: "boolean" },
    "e66437f6-089c-4f5c-b4ba-d1f8c71506d0": { name: "SatisfactionLevelComment", type: "textInf" },
    "fce13454-f217-4c5e-af89-35e4d8ebdda3": { name: "SolutionRemains", type: "numDec01" },
    "6ab42472-7828-4d51-a3e6-c38b485f3252": { name: "ServicePact", type: "lookup" },
    "61ccdc6d-f9dc-4b22-a86d-212127e717a6": { name: "ServiceItem", type: "lookup" },
    "35f11903-ab15-47ee-b0a4-2f003922667d": { name: "Problem", type: "lookup" },
    "869fd0ea-052e-4107-b426-ea8176e370dc": { name: "SupportLevel", type: "lookup" },
    "6bc89a93-6a89-4d71-ad7c-df9d81c15978": { name: "SolvedOnSupportLevel", type: "lookup" },
    "a587b494-47f3-4b27-be42-a259e579f061": { name: "ParentCase", type: "lookup" },
    "86dd6835-a362-4bc6-afee-03c603cf8335": { name: "Change", type: "lookup" },
    "86567001-01f1-403b-8b2e-34ee5d17c811": { name: "ServiceCategory", type: "lookup" },
    "c0b67cd6-c592-4f3e-9efe-12e783c4d396": { name: "FirstSolutionProvidedOn", type: "dateTime" },
    "2042c68f-9121-4974-87fd-d7d8c8b596f0": { name: "Holder", type: "lookup" },
    "58cec386-8fdf-42e3-8014-ca4001c615ec": { name: "ProcessingTimeUnit", type: "lookup" },
    "28dfd64f-463a-449c-9fcd-a9bfed4a5686": { name: "ProcessingTimeUnitValue", type: "numInteger" },
    "7c5530e9-ca8e-4fa7-b4b1-c88631206e5a": { name: "ConfItem", type: "lookup" },
    "b59a15ea-751e-4fd8-8281-f1a3dc7190ff": { name: "ParentActivity", type: "lookup" },
    "a5cca792-47dd-428a-83fb-5c92bdd97ff8": { name: "Name", type: "text250" },
    "64fa90dd-0cf5-45d7-88e4-6fa691d3c425": { name: "Owner", type: "lookup" },
    "c5d7c4d3-f308-40d3-8469-6ab6882bd70a": { name: "Dear", type: "text250" },
    "f16cbd03-a8a8-4bdd-9970-a0c7985a1996": { name: "SalutationType", type: "lookup" },
    "3a3317c0-09f6-4a26-998b-018d1caa2c36": { name: "Gender", type: "lookup" },
    "5c6ca10e-1180-4c1e-8a50-55a72ff9bdd4": { name: "Account", type: "lookup" },
    "f70c762a-1038-49a7-a3e8-f24fb8cfdeef": { name: "DecisionRole", type: "lookup" },
    "a49571cc-a9a9-4c3e-a346-46c466e9a0d3": { name: "Type", type: "lookup" },
    "344436e4-9d6b-4a30-936f-f8ea45f2adb4": { name: "Job", type: "lookup" },
    "8b680ac7-e46c-466c-b630-e5cb4da13a55": { name: "JobTitle", type: "text250" },
    "94cb8750-ad6f-4e80-b553-7d9e194a856e": { name: "Department", type: "lookup" },
    "3f08db69-6d2f-4b1c-87a4-acddc6c3b9d6": { name: "BirthDate", type: "date" },
    "84c5808a-7859-4198-ba6a-243c95a3300b": { name: "Phone", type: "text250" },
    "98e085c7-ad4d-4ac6-8c1c-09be09876d44": { name: "MobilePhone", type: "text250" },
    "0a455b85-133c-4944-aff1-2ce7f7e50fee": { name: "HomePhone", type: "text250" },
    "5ff9516e-251c-41de-a085-67fa199cdfe7": { name: "Skype", type: "text250" },
    "dbf202ec-c444-479b-bcf4-d8e5b1863201": { name: "Email", type: "text250" },
    "5ad029c6-0fa7-4db6-8fef-c72a0f535682": { name: "AddressType", type: "lookup" },
    "0fb61bc8-a195-4d90-aecc-18b411b51814": { name: "Address", type: "textInf" },
    "cf58ca72-531b-4dd2-b4d5-f0d5b7c556f6": { name: "City", type: "lookup" },
    "0e50f221-470e-482b-8580-f61c74b8b1c1": { name: "Region", type: "lookup" },
    "0737d99d-eebc-4b8e-9859-634414f7cc04": { name: "Zip", type: "text50" },
    "9463dea9-2576-4d37-812f-342ee57ddf32": { name: "Country", type: "lookup" },
    "1b1d8f33-4d26-4353-a1ed-07e11fc82112": { name: "DoNotUseEmail", type: "boolean" },
    "a6bcf6fe-a06d-42ed-a263-f829ece05fd9": { name: "DoNotUseCall", type: "boolean" },
    "d9deaed5-8e42-40c0-9bb1-a6bfe6716ca4": { name: "DoNotUseFax", type: "boolean" },
    "7e295464-4dee-4448-832c-97434b1f2943": { name: "DoNotUseSms", type: "boolean" },
    "238d9e74-ff12-4e40-8467-350bd9d4b58d": { name: "DoNotUseMail", type: "boolean" },
    "fd73da4b-2b3d-483e-89d2-383a6db099ac": { name: "Notes", type: "textInf" },
    "5282096d-e4af-470a-bfbc-3e3542f04515": { name: "Facebook", type: "text250" },
    "644a4505-9c9c-477e-8037-b73c14d109df": { name: "LinkedIn", type: "text250" },
    "83239d8b-efb5-4a28-80b7-219bdbd2a752": { name: "Twitter", type: "text250" },
    "21a16860-9d95-4f60-9c23-66b3392ea5f4": { name: "FacebookId", type: "text250" },
    "10ebe04c-3e1e-4606-93a5-dbdfdb230e71": { name: "LinkedInId", type: "text250" },
    "2e96804c-cf03-4ab0-a532-79b032dc4529": { name: "TwitterId", type: "text250" },
    "327e44bd-0b97-48c0-b11a-4686d6605b4f": { name: "ContactPhoto", type: "blob" },
    "d1732e56-de5f-4bf6-ac22-228d7f768aa3": { name: "TwitterAFDA", type: "lookup" },
    "3ed551e5-7963-4056-95fb-6b6c871145af": { name: "FacebookAFDA", type: "lookup" },
    "b3cf002a-466c-4ea7-a457-b3630ec24e9d": { name: "LinkedInAFDA", type: "lookup" },
    "0495373c-5053-4ae3-b553-dc92779c4702": { name: "Photo", type: "imageLink" },
    "b903e71d-74cd-4b79-9dd9-d0c84ef6ad44": { name: "GPSN", type: "text50" },
    "b9021fa0-6606-4027-8335-bf0624b58218": { name: "GPSE", type: "text50" },
    "771a60e2-020c-4dd2-8512-b428b8a47dba": { name: "Surname", type: "text250" },
    "cc26b1c5-4254-4287-9c15-0b5acd319811": { name: "GivenName", type: "text250" },
    "33a879a3-d466-4b3f-b529-377a69ff0819": { name: "MiddleName", type: "text250" },
    "ced280cc-7423-4175-9896-ea592a9e81a6": { name: "Confirmed", type: "boolean" },
    "65db5bf4-c253-4bd3-8988-ca1c6397a7ee": { name: "IsNonActualEmail", type: "boolean" },
    "60367403-6019-4d03-971d-169a5ec27542": { name: "Completeness", type: "numInteger" },
    "a855b7ae-45be-4d73-9074-9d84e4ae66c4": { name: "Language", type: "lookup" },
    "bcdc7a32-4332-4caf-858d-0078b56856fe": { name: "Age", type: "numInteger" },
    "fdd77a82-fa25-4c0f-94d6-56cf0254521f": { name: "Number", type: "text250" },
    "60364b7c-e7c4-43e3-81bf-5899e49a01aa": { name: "StartDate", type: "date" },
    "420f8d90-f6b1-4140-81b8-53e1f39d1379": { name: "PrimaryAmount", type: "numCurrency" },
    "76ec81f5-b0ea-4a33-a4bc-eddd91d0dcca": { name: "PrimaryPaymentAmount", type: "numCurrency" },
    "77ce961a-530c-49f1-a1f9-981cda246cb9": { name: "PaymentStatus", type: "lookup" },
    "c3d2e53a-5062-4930-adac-7cbcd9d3f58c": { name: "Owner", type: "lookup" },
    "dcf334e9-8a73-430b-ab97-17d9b9de64a3": { name: "SupplierBillingInfo", type: "lookup" },
    "2a25b353-2d85-4ce6-b26e-894b514369ff": { name: "RemindToOwner", type: "boolean" },
    "e96ea96f-dc5d-4164-b182-e227978ac6e2": { name: "RemindToOwnerDate", type: "dateTime" },
    "8c7dd99b-d5c2-4cb5-ab16-84e1d0332ed6": { name: "CustomerBillingInfo", type: "lookup" },
    "d7d9c859-18ad-408d-96ef-5a9f3090c168": { name: "Currency", type: "lookup" },
    "734583ef-459f-45f5-9e5e-a1808e435fcf": { name: "CurrencyRate", type: "numDec000000001" },
    "ec9d2333-9e2d-4f70-b831-5be130a4b4ac": { name: "Amount", type: "numCurrency" },
    "0d587626-2ccb-45e2-b582-27815c74f835": { name: "DueDate", type: "date" },
    "07547348-9989-4367-9325-b1fa3281bf78": { name: "PaymentAmount", type: "numCurrency" },
    "7c5a1586-bac8-433c-adda-30e45d8a71a4": { name: "Notes", type: "textInf" },
    "b52f52a0-c983-4477-a4c3-6127cb052db4": { name: "Account", type: "lookup" },
    "8cf3941e-8061-42b9-80fa-d7936b228e84": { name: "Contact", type: "lookup" },
    "2d36486c-1e97-434d-82f8-aed0e3162d8f": { name: "Supplier", type: "lookup" },
    "4566ed19-07f2-4836-9fda-eb24b2112208": { name: "Opportunity", type: "lookup" },
    "85d0da72-7b6d-43fc-9279-bb96431481e2": { name: "Project", type: "lookup" },
    "4e473dd6-40a8-463b-8ae4-9af8afe2599e": { name: "Order", type: "lookup" },
    "2467a848-5e0b-4891-8657-0a5776eb4ab9": { name: "Contract", type: "lookup" },
    "b419c3b3-22c7-44ad-8fc8-c02618d362dc": { name: "AmountWithoutTax", type: "numCurrency" },
    "08be4ee9-724d-45ee-b01a-1906f7e9670c": { name: "PrimaryAmountWithoutTax", type: "numCurrency" },
    "a7a263e8-7fc8-409c-9ada-14d2d38ba1d1": { name: "PaymentAmountWithoutTax", type: "numCurrency" },
    "f6182f6b-cf24-4858-b9e2-5377f59fa07a": { name: "PrimaryPaymentAmountWithoutTax", type: "numDec001" },
    "ca97d08a-da88-4e75-a732-6501bc043dcb": { name: "FinalStatus", type: "boolean" },
    "abc96728-faf6-451d-91f6-35bc53ea9745": { name: "Notes", type: "textInf" },
    "85e56029-bf1f-46b8-9293-a6395e7f00f9": { name: "Account", type: "text250" },
    "865eb25f-3941-423f-a4c0-c7834368a7af": { name: "Contact", type: "text250" },
    "afdaca14-10c0-4767-b1f4-ed06946d37eb": { name: "Title", type: "lookup" },
    "4d0cc359-3e5f-481c-b8aa-117ca6b24c06": { name: "FullJobTitle", type: "text250" },
    "9ad7b70c-f7cb-4877-8186-16c8dea584fa": { name: "Status", type: "lookup" },
    "243f2974-3fa5-4b78-93e9-7fc8c1bc2749": { name: "InformationSource", type: "lookup" },
    "2edaf1d4-f64e-4351-aa6b-c81a7ebfc108": { name: "Industry", type: "lookup" },
    "718683e1-7d00-48d6-ad3f-c882ee2ce79f": { name: "AnnualRevenue", type: "lookup" },
    "49508aa7-fa69-4ce3-aa4d-1eeb2c9d73a5": { name: "EmployeesNumber", type: "lookup" },
    "94a3a853-08cb-485f-89f4-182878a5aaeb": { name: "BusinesPhone", type: "text250" },
    "40fef1d9-f9d9-4246-a90f-389e256aacd4": { name: "MobilePhone", type: "text250" },
    "fee32d81-7e24-4a34-91c7-3083e4d4938f": { name: "Email", type: "text250" },
    "75485248-dedd-4fa5-ace4-787e2d097627": { name: "Fax", type: "text250" },
    "e753916c-14d1-4213-bb77-9334d5e6bf7f": { name: "Website", type: "text250" },
    "66852a75-b22e-4390-a8df-49814cdb0131": { name: "AddressType", type: "lookup" },
    "d79b4d09-4791-4993-952b-e097088b55c6": { name: "Country", type: "lookup" },
    "dce30e38-3b37-40b3-b9f5-08b790d93420": { name: "Region", type: "lookup" },
    "4258b690-fe71-4b7a-8278-f0a7b9dd4780": { name: "City", type: "lookup" },
    "e1f35c38-67f2-4da3-a3f6-d4294aada246": { name: "Zip", type: "text50" },
    "76b846c6-6af5-40c2-9576-5c5dbc0d6200": { name: "Address", type: "textInf" },
    "89a00df1-3d34-4a63-b34c-2978dcf7e0ae": { name: "DoNotUseEmail", type: "boolean" },
    "7c2e8e89-aba1-46b1-b386-83480927dd78": { name: "DoNotUsePhone", type: "boolean" },
    "1e8e0db1-0507-47eb-97c7-ceb789403aad": { name: "DoNotUseFax", type: "boolean" },
    "48a0c461-b224-4faf-8ede-ce36d53af43e": { name: "DoNotUseSMS", type: "boolean" },
    "54067cf3-13f5-42d1-8af9-90c6bddc7773": { name: "DoNotUseMail", type: "boolean" },
    "3875ae0d-ca52-4134-81df-2f67a88a3e78": { name: "Commentary", type: "textInf" },
    "ad490d58-054a-4d85-9246-dd8466eb3983": { name: "QualifiedContact", type: "lookup" },
    "32949ae4-ff13-48f5-9f5d-45a74558ea55": { name: "QualifiedAccount", type: "lookup" },
    "d06ba9af-faf5-4741-a672-e154ae561a94": { name: "LeadName", type: "text500" },
    "dc75275f-426d-4f50-a4ec-dc7296c7d1cd": { name: "CountryStr", type: "text250" },
    "eef401ef-dda7-4ba1-8a29-6adf42a527fb": { name: "RegionStr", type: "text250" },
    "a5f6978f-18e4-47c6-938d-9390b9386db6": { name: "CityStr", type: "text250" },
    "9389d289-6386-48fc-9bd5-2c5872332662": { name: "WebForm", type: "lookup" },
    "5c696704-62e8-4503-86bf-ed66c3dd63d5": { name: "LeadType", type: "lookup" },
    "9b279c76-0213-4f51-acd6-3936e1069bd4": { name: "LeadTypeStatus", type: "lookup" },
    "1970ed4a-c0ea-4d9d-97ab-68bc7ccc324a": { name: "LeadDisqualifyReason", type: "lookup" },
    "a3200694-9a9a-42a6-824f-870d5b03e255": { name: "AccountCategory", type: "lookup" },
    "6a7045c5-ab82-4bf9-a929-9ac065c69343": { name: "AccountOwnership", type: "lookup" },
    "c7fb190e-51d8-4c65-a5db-c3714d3b0af7": { name: "Department", type: "lookup" },
    "257a1321-f45d-4868-bf44-e9f2297661d3": { name: "Gender", type: "lookup" },
    "aa8c19b4-a8fb-4284-b969-8f15630a25ec": { name: "Job", type: "lookup" },
    "4a577f44-6cf7-40d0-b1f8-81c2cf6539d1": { name: "DecisionRole", type: "lookup" },
    "bc0c2d60-5a3d-4840-aa4e-c60ea776e206": { name: "QualifyStatus", type: "lookup" },
    "ee7282d6-232b-449f-bf7b-1bd2e1f36a58": { name: "Dear", type: "text250" },
    "9fb3dc53-b29b-46e2-ba98-ae587bf61fb2": { name: "QualificationProcessId", type: "uuid" },
    "52817348-4c01-4015-a766-cb10c7b554c8": { name: "Owner", type: "lookup" },
    "279fe3e0-79c0-4f80-ba0f-f56df245f49c": { name: "RemindToOwner", type: "boolean" },
    "5c0fa796-b083-4126-ace9-cfddc25539a0": { name: "SalesOwner", type: "lookup" },
    "882bf1d7-3d1f-4208-80ca-bf913c8d4f2f": { name: "Budget", type: "numCurrency" },
    "efc32501-4c3a-4500-8fa4-1d70c6bf26f9": { name: "MeetingDate", type: "dateTime" },
    "4c3a6f1b-99d3-4baf-8954-076274d0675c": { name: "DecisionDate", type: "dateTime" },
    "11b61c8f-5920-4f71-8df0-d68b54efc8db": { name: "ShowDistributionPage", type: "boolean" },
    "33099014-9741-4d65-aec1-8f0fbe5da8b3": { name: "BpmHref", type: "textInf" },
    "80755b15-6dcc-400e-99ad-cfd9ac5a08a9": { name: "BpmRef", type: "textInf" },
    "087fc72c-7115-4275-965c-c100b7eabba1": { name: "RegisterMethod", type: "lookup" },
    "52e9a4db-31fd-4cec-8ad5-4f07143c900c": { name: "LeadSource", type: "lookup" },
    "6af59dc9-8eda-4550-b30a-00db9126349c": { name: "LeadMedium", type: "lookup" },
    "a40a64fa-a0ea-40e6-9476-a59c1dfbb93f": { name: "OpportunityDepartment", type: "lookup" },
    "7dc3ed3f-ce06-4a75-8d38-9e0badcece6e": { name: "IdentificationPassed", type: "boolean" },
    "0c40a261-945a-41b7-8db3-8ea08c2a021a": { name: "Campaign", type: "lookup" },
    "7dd57d6b-5262-4c8c-a61a-41b83257b36f": { name: "BulkEmail", type: "lookup" },
    "f904f43e-672c-42f8-a5ed-e484d6d799ce": { name: "Qualified", type: "numInteger" },
    "2917b3c0-75e0-41d3-be64-764da1f5369a": { name: "SaleParticipant", type: "numInteger" },
    "6e8ab674-b580-4620-912a-78cdc93ddc7f": { name: "QualifiedPercent", type: "numDec001" },
    "35c9d777-642d-455a-8011-0bf9fdf797fd": { name: "SalePercent", type: "numDec001" },
    "ad34e929-02a6-4baf-88b5-4efbf982c577": { name: "StartLeadManagementProcess", type: "boolean" },
    "bca817e3-756d-4098-8804-859940310d68": { name: "SaleType", type: "text50" },
    "7c4d10e3-5ace-4362-8b9c-73b858ba9fec": { name: "Score", type: "numDec001" },
    "d46a1b66-17a7-4603-b1ce-49313701da31": { name: "QualificationPassed", type: "boolean" },
    "03e9e2ca-9168-4ae1-8ff3-a92c7bb85344": { name: "Event", type: "lookup" },
    "016f2995-d657-4704-a9a0-cd4deeca83b9": { name: "NextActualizationDate", type: "dateTime" },
    "63835aed-0d82-40d3-b102-75140767b1e5": { name: "BpmSessionId", type: "uuid" },
    "f3735b14-5953-4b62-b5cd-23c5e4860a14": { name: "PredictiveScore", type: "numInteger" },
    "311e6ef0-7dad-4996-91ff-77977f17c2c4": { name: "MovedToFinalStateOn", type: "dateTime" },
    "a6468ddc-9b5d-4416-4e74-06965d13566b": { name: "LeadGenExtendedLeadInfo", type: "lookup" },
    "f7875c95-5490-e1f3-b1de-68c7f9cef845": { name: "SocialMetadata", type: "textInf" },
    "6dcd0304-ebd6-4e01-8d09-7e9eed95c8de": { name: "Order", type: "lookup" },
    "7cfff438-9ee8-4272-816d-5deb7d0c9d36": { name: "Opportunity", type: "lookup" },
    "693f56bf-b9bb-4f39-bca2-1b307f60cca5": { name: "Partner", type: "lookup" },
    "becf8a84-8327-4864-97d3-209b2a7dc67e": { name: "PartnerOwner", type: "lookup" },
    "215eb46b-7973-42c0-bb8f-8b011a8fbd67": { name: "PartnerType", type: "lookup" },
    "33cf5522-8fdc-4d80-ae7a-07c96cefebca": { name: "SalesChannel", type: "lookup" },
    "790563cf-fd14-4d5d-a5fd-b6eddb10d6d3": { name: "Title", type: "text500" },
    "2b2e93bb-c5ac-4478-9e31-306c5bd5ceeb": { name: "Type", type: "lookup" },
    "797ac352-4979-4d28-906f-82feb6dbc9dc": { name: "Stage", type: "lookup" },
    "c8f5d6d7-aa99-4295-ade0-4ff6e840655f": { name: "DueDate", type: "dateTime" },
    "d979bca9-13c3-463b-b279-641c0c51f9df": { name: "CloseReason", type: "lookup" },
    "684553a7-a59d-46fa-af4b-fc76e9fe3694": { name: "Owner", type: "lookup" },
    "975de813-489f-495b-98ab-e56a8a527e77": { name: "Notes", type: "textInf" },
    "4b95e3ff-fd52-4ae1-b0a5-2c5103ff15a7": { name: "Account", type: "lookup" },
    "fae41c1b-a153-43df-852a-17ab3e608c18": { name: "Category", type: "lookup" },
    "c4eab4ef-2c91-43b5-b2a1-df5e60f6c3cd": { name: "Mood", type: "lookup" },
    "3aab3a22-ded6-41a6-98bb-4bc7ca20bb06": { name: "IsPrimary", type: "boolean" },
    "75ad358c-8d9c-4bbb-83d5-2d9f60d3b7c3": { name: "Partner", type: "lookup" },
    "4348809e-6f05-426c-8802-958ffe90b176": { name: "Budget", type: "numDec001" },
    "bc62f730-7e4a-4578-953c-1cd9ac58a2b2": { name: "Probability", type: "numInteger" },
    "63c0fc1f-ac41-4497-96be-c27201994072": { name: "Amount", type: "numDec001" },
    "6c76d697-8138-47fc-897c-1f3820c45893": { name: "Source", type: "lookup" },
    "15f0f091-e66f-42db-807b-f4c2ad6337b6": { name: "ResponsibleDepartment", type: "lookup" },
    "19429c25-e5dc-4a77-ab74-69bbec821ce4": { name: "Weaknesses", type: "text500" },
    "9295050c-1727-416a-949d-4684e2b61e3b": { name: "Strength", type: "text500" },
    "d1cf610a-dc34-447b-b637-9970dc4f1b7e": { name: "Tactic", type: "text500" },
    "7d2e418f-2cac-4b0c-823c-9f431027ce56": { name: "CheckDate", type: "date" },
    "65715559-fa3f-4781-be93-5f3920b3e8f4": { name: "ProcessId", type: "uuid" },
    "f460aa34-e072-4804-aa46-f886e60a3852": { name: "Winner", type: "lookup" },
    "64a05bfa-350d-4dbf-bfd8-fb579a74f39e": { name: "Contact", type: "lookup" },
    "cf5dc330-48e7-48ac-8b86-06ffb1ae0391": { name: "Completeness", type: "numInteger" },
    "f22a9cf5-213a-427f-aed7-ef864ffff2dd": { name: "Description", type: "textInf" },
    "9ec83c9d-d3f5-4aa0-a26c-22ae9b2657e0": { name: "PredictiveProbability", type: "numInteger" },
    "6b0dc85d-37b8-41c8-809a-6e30ddaf1f32": { name: "LeadType", type: "lookup" },
    "9ecd00e7-8bc5-4f52-b361-477831d42559": { name: "ByProcess", type: "boolean" },
    "a95a4e48-7891-4394-bebc-94a52d2c83db": { name: "Opportunity", type: "lookup" },
    "31fb834c-0d66-4272-a002-92f7ee99dcc4": { name: "Product", type: "lookup" },
    "c8aebeb1-1cfa-40e0-9d13-9e5a833a7af8": { name: "Quantity", type: "numDec001" },
    "b7a9f0bb-fc54-4767-bb31-e282f72fa1a0": { name: "OfferDate", type: "date" },
    "0d863985-10fd-4b5d-9135-c20b1522f626": { name: "OfferResult", type: "lookup" },
    "9b6e7c1d-1407-474b-925a-e50da9f36419": { name: "Comment", type: "textInf" },
    "8b1b514f-1ad8-46af-a324-5a9096a066dc": { name: "Price", type: "numDec001" },
    "329a1823-df3b-4846-a6fb-c5f9fc259993": { name: "Amount", type: "numDec001" },
    "df2849fa-59d7-44cf-bbd3-43d665480846": { name: "Number", type: "text250" },
    "c7000dc3-98ae-4f74-a43e-78e959604c29": { name: "Account", type: "lookup" },
    "0fd688be-10f3-4c9b-a9ce-3eab4a4eaaf5": { name: "Date", type: "dateTime" },
    "81c8e318-76ac-4895-9a9b-9760b27c55ea": { name: "Owner", type: "lookup" },
    "b3fc6240-4ba6-4d99-808c-c090d13862f7": { name: "Status", type: "lookup" },
    "f0989427-15ec-454f-9895-3ecd431d0959": { name: "PaymentStatus", type: "lookup" },
    "66bfb36b-300e-4dc1-8693-df090fde2d30": { name: "DeliveryStatus", type: "lookup" },
    "8e8985ca-8d3e-4cc0-9cba-246633902169": { name: "Contact", type: "lookup" },
    "4a418844-a3ec-4ef2-8d9a-aa333a5139a1": { name: "DueDate", type: "dateTime" },
    "62de58be-fb36-493d-a499-ea71d7ae2be4": { name: "ActualDate", type: "dateTime" },
    "e8baae01-73b8-43c4-b4ca-f653c1c4bb94": { name: "Currency", type: "lookup" },
    "1b70c1f1-6805-49dd-a73c-b00e46c6ff63": { name: "CurrencyRate", type: "numDec000000001" },
    "f397997e-a5b6-474d-a12f-9a1449c29e96": { name: "Amount", type: "numCurrency" },
    "13efad8a-9522-412b-9f0e-2e43df125406": { name: "PaymentAmount", type: "numCurrency" },
    "b275e869-f951-4f7b-9392-7457f4bf625e": { name: "PrimaryAmount", type: "numCurrency" },
    "8007a0cc-f7b8-4a7c-a0c5-3bf80805c813": { name: "PrimaryPaymentAmount", type: "numCurrency" },
    "fd306048-13d8-4ad4-a640-fda378a74693": { name: "SourceOrder", type: "lookup" },
    "d56f1b6b-3d46-4a42-ac08-3014c569f314": { name: "Notes", type: "textInf" },
    "7fe04af6-f7c7-4bb2-8413-b65da9e4f33c": { name: "Opportunity", type: "lookup" },
    "673e7526-3356-4a7b-aa14-78592983118e": { name: "DeliveryAddress", type: "text500" },
    "3a54989b-8245-4321-a561-e683f4348bd0": { name: "DeliveryType", type: "lookup" },
    "c55f4de9-a44b-4665-bb42-cfa8f66454f3": { name: "PaymentType", type: "lookup" },
    "6d877814-c8af-40be-9532-770586e78936": { name: "ReceiverName", type: "text50" },
    "3d670e44-d54a-4d61-a087-e6ebbecbb208": { name: "Comment", type: "text500" },
    "4e5c0375-c940-49b0-9859-424b89e5cbcd": { name: "ContactNumber", type: "text50" },
    "8d86568b-3932-4687-92fe-b637c234d390": { name: "Position", type: "numInteger" },
    "037591ee-fc21-4788-9b2e-a005dd21882d": { name: "Name", type: "text250" },
    "369b4363-6804-473b-92a5-4ee233772082": { name: "Notes", type: "textInf" },
    "a977122d-8f0c-49be-a0ce-bb9faf81bdc6": { name: "Product", type: "lookup" },
    "237ca70c-b45e-46e8-a8eb-67e30584af32": { name: "CustomProduct", type: "text250" },
    "5db18b1c-a7b8-4bd2-bb00-60e6f3663da3": { name: "DeliveryDate", type: "date" },
    "c4e45448-ad41-4fc8-9c8b-904790d003ff": { name: "Quantity", type: "numDec0001" },
    "d7fe119a-a831-4c2a-ba74-bdab58857363": { name: "Unit", type: "lookup" },
    "39182ce0-41eb-4f71-bf55-1deb88489688": { name: "PrimaryPrice", type: "numCurrency" },
    "1835d8c5-7687-4bad-a4a7-b6a4fbf45948": { name: "Price", type: "numCurrency" },
    "7ad56546-758e-4f32-bfe4-b96ac8b48d1f": { name: "PrimaryAmount", type: "numCurrency" },
    "fcc86ad4-073f-4450-baab-abfa226b9e0a": { name: "Amount", type: "numCurrency" },
    "08d936ff-1b7e-4a67-af92-2a870180ac9d": { name: "PrimaryDiscountAmount", type: "numCurrency" },
    "68ea19d8-502b-4732-83a6-a959bcf3eea7": { name: "DiscountAmount", type: "numCurrency" },
    "17e259cd-0063-46df-8cee-20bb4e2aad8b": { name: "DiscountPercent", type: "numCurrency" },
    "d833bc97-8f18-416f-aef1-f7218abb2e0d": { name: "Tax", type: "lookup" },
    "04a9e624-8638-48b3-ad41-100a8fd583f9": { name: "PrimaryTaxAmount", type: "numCurrency" },
    "adb28cb7-3d76-4c93-a54f-97a4c6089946": { name: "TaxAmount", type: "numCurrency" },
    "16c14cc8-459b-408d-bcc1-8b6c29efb26f": { name: "PrimaryTotalAmount", type: "numCurrency" },
    "c97c6457-a800-472d-908b-991e63b65b05": { name: "TotalAmount", type: "numCurrency" },
    "9db15d13-6c10-4818-8e1f-fcb55974c83e": { name: "DiscountTax", type: "numDec001" },
    "5d990ae6-2f01-4ab2-ae31-d384e6070ec3": { name: "Order", type: "lookup" },
    "c2c346e2-db9e-4468-8d3a-552348536dbe": { name: "Contract", type: "lookup" },
    "d39634bd-ec70-4b48-964d-47d0c052a47a": { name: "Currency", type: "lookup" },
    "727aff73-e56f-401b-af5f-4a4d3a28c235": { name: "CurrencyRate", type: "numDec000000001" },
    "f6e0a8f0-6eb4-4496-a092-b229cf31a6d6": { name: "BaseQuantity", type: "numDec0001" },
    "e71dceda-9b0f-4509-aa10-f479aa69a9eb": { name: "PriceList", type: "lookup" },
    "e3040d2d-93ff-4528-a4b7-42603e08bdcf": { name: "Name", type: "text250" },
    "2e1f4643-a44a-415e-8c4c-79283dc3d1d9": { name: "Code", type: "text50" },
    "e485abc9-4cc0-48ba-a8e6-76a6dd2ea222": { name: "Unit", type: "lookup" },
    "e241007b-18ad-4411-a6fb-caf56fdaa941": { name: "Currency", type: "lookup" },
    "ab19483e-bd98-4b76-9565-56f7e309758b": { name: "Price", type: "numCurrency" },
    "51a20224-e62d-4198-b3e5-354d46e68af8": { name: "Tax", type: "lookup" },
    "6cd88fbf-2355-45f8-8c8a-8e6308a77b96": { name: "URL", type: "text" },
    "ac574603-a4db-410c-877d-e383c0a6c51a": { name: "Type", type: "lookup" },
    "b4687e9c-060d-4f9b-8367-b8ed66af0ada": { name: "Active", type: "boolean" },
    "b2030ccd-1270-4bed-ac8b-4ebf4cfda0d1": { name: "Owner", type: "lookup" },
    "75b2a101-2a27-4911-a5c0-d4f7c724914d": { name: "Description", type: "textInf" },
    "ae5ef7d5-1044-477f-affb-83bce9e65bbd": { name: "ProductSource", type: "lookup" },
    "4c9ed783-148c-41eb-92dd-5975dcfbdcd1": { name: "Notes", type: "textInf" },
    "3da5d5e7-908f-4cb2-81af-aa137eabb041": { name: "Picture", type: "imageLink" },
    "3f6a282b-4d25-4f87-b63a-4a192abd19f6": { name: "IsArchive", type: "boolean" },
    "84c5953d-e261-449e-9189-8fac859db36d": { name: "Category", type: "lookup" },
    "bc105fcf-3068-4525-9c22-efc1942262cd": { name: "TradeMark", type: "lookup" },
    "374c1573-9519-1354-cfd0-e8e05f9bf139": { name: "ShortDescription", type: "text250" },
    "fa2b1d57-70d8-de17-b6ef-489f7ce676e5": { name: "Benefits", type: "textInf" },
    "a1f91e7a-b322-de8c-9482-373b7cf109e1": { name: "GeneralConditions", type: "textInf" },
    "a7a910aa-80d0-4e1a-95cc-79d9f2d291f9": { name: "EntitySchemaUId", type: "uuid" },
    "b076a792-429d-47db-891d-6621341a0bde": { name: "EntityId", type: "uuid" },
    "fb47c81f-a125-488b-b2fb-05415b8da84c": { name: "Message", type: "textInf" },
    "de240686-3bf2-4759-b6fc-8e859b0b25cc": { name: "Parent", type: "lookup" },
    "bee7652b-3271-4ef4-ae9b-2d52545b33d5": { name: "LikeCount", type: "numInteger" },
    "f7957826-183c-4351-9c96-9e68ac436451": { name: "CommentCount", type: "numInteger" },
    "8f678ac8-8a72-46e0-929f-bde1a8411997": { name: "LastActionOn", type: "dateTime" },
  },
};
