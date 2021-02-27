import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class SurveysUsersRespository extends Repository<SurveyUser>{}

export { SurveysUsersRespository }